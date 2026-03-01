import React, { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

const FaceTracker = () => {
  const videoRef = useRef(null);
  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    let faceLandmarker;
    let animationFrameId;

    const setupDetector = async () => {
      // 1. Load WASM files from CDN
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );

      // 2. Initialize Face Landmarker
      faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: "GPU"
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO"
      });

      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", predictWebcam);
      });
    };

    const predictWebcam = () => {
      if (!faceLandmarker || !videoRef.current) return;

      const results = faceLandmarker.detectForVideo(videoRef.current, performance.now());

      if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
        const shapes = results.faceBlendshapes[0].categories;
        detectExpression(shapes);
      }

      animationFrameId = requestAnimationFrame(predictWebcam);
    };

    // 3. Simple Logic to map Blendshapes to Emotions
    const detectExpression = (shapes) => {
      const findScore = (name) => shapes.find(s => s.categoryName === name)?.score || 0;

      const smile = findScore("mouthSmileLeft") + findScore("mouthSmileRight");
      const browDown = findScore("browDownLeft") + findScore("browDownRight");
      const eyeWide = findScore("eyeWideLeft") + findScore("eyeWideRight");

      if (smile > 0.8) setExpression("😊 Happy Ho Aap");
      else if (browDown > 0.6) setExpression("😠 Angry / Focused");
      else if (eyeWide > 0.4) setExpression("😲 Surprised");
      else setExpression("😐 Neutral");
    };

    setupDetector();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Expression: {expression}</h2>
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        style={{ width: "600px", borderRadius: "10px", border: "2px solid #333" }} 
      />
    </div>
  );
};

export default FaceTracker;