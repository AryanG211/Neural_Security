// "use client";
// import React, { useState, useRef } from "react";

// const ImageDragger = () => {
//     const defaultImage = "/DemoProfile.jpg";
//     const [uploadedImage, setUploadedImage] = useState(null);
//     const [generatedImage, setGeneratedImage] = useState(null);
//     const [personInfo, setPersonInfo] = useState(null);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [isFetchingInfo, setIsFetchingInfo] = useState(false);
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const [showLiveFeed, setShowLiveFeed] = useState(false);
//     const videoRef = useRef(null);
//     let mediaStream = useRef(null);

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         resetState();
//         setUploadedImage(URL.createObjectURL(file));
//         setIsProcessing(true);

//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             const response = await fetch("http://127.0.0.1:8000/generate/", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!response.ok) throw new Error(`Failed: ${response.statusText}`);

//             const blob = await response.blob();
//             setGeneratedImage(URL.createObjectURL(blob));
//         } catch (error) {
//             setErrorMessage(error.message || "Something went wrong");
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     const handleViewInformation = async () => {
//         if (!generatedImage) return;

//         setIsFetchingInfo(true);
//         setErrorMessage("");
//         setPersonInfo(null);

//         try {
//             const response = await fetch("http://127.0.0.1:8000/get_matched_info/");
//             if (!response.ok) throw new Error(`Failed: ${response.statusText}`);

//             const data = await response.json();

//             if (data && data.name) {
//                 setPersonInfo(data);
//                 setIsPopupOpen(true);
//             } else {
//                 setPersonInfo({ name: "Not Found", location: "Unknown" });
//                 setIsPopupOpen(true);
//             }
//         } catch (error) {
//             setErrorMessage(error.message || "Error fetching details.");
//         } finally {
//             setIsFetchingInfo(false);
//         }
//     };

//     const handleLiveDetection = () => {
//         setShowLiveFeed(true);
//         setErrorMessage("");
//     };

//     const stopLiveDetection = () => {
//         setShowLiveFeed(false);
//     };

//     const resetState = () => {
//         setUploadedImage(null);
//         setGeneratedImage(null);
//         setPersonInfo(null);
//         setErrorMessage("");
//         setIsPopupOpen(false);
//         setShowLiveFeed(false);
//     };

//     return (
//         <div className="max-w-4xl mx-auto p-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="flex justify-center items-center p-5 border rounded-lg shadow-md bg-gray-100">
//                     <img src={uploadedImage || defaultImage} alt="Uploaded Preview" className="w-full h-auto rounded-lg" />
//                 </div>
//                 {!generatedImage ? (
//                     <div className="border-2 border-dashed p-6 rounded-lg shadow-md bg-gray-50 flex flex-col items-center text-center cursor-pointer justify-center">
//                         <p className="block mb-3">Drag & Drop an Image Here</p>
//                         <label className="px-5 py-2 block bg-[#1E3D58] text-[#E8EEF1] cursor-pointer hover:bg-[#057DCD] hover:scale-105 rounded-sm shadow-md shadow-black">
//                             Select Image
//                             <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
//                         </label>
//                     </div>
//                 ) : (
//                     <div className="relative flex flex-col items-center p-5 border rounded-lg shadow-md bg-gray-100">
//                         <img src={generatedImage} alt="Generated Preview" className="w-full h-auto rounded-lg" />
//                         <div className="flex gap-4 mt-4">
//                             <button 
//                                 onClick={handleViewInformation} 
//                                 className="px-5 py-2 bg-[#1E3D58] text-[#E8EEF1] cursor-pointer hover:bg-[#057DCD] hover:scale-105 rounded-sm shadow-md shadow-black"
//                                 disabled={isFetchingInfo}
//                             >
//                                 {isFetchingInfo ? "Fetching..." : "View Info"}
//                             </button>
//                             <button 
//                                 onClick={handleLiveDetection} 
//                                 className="px-5 py-2 bg-[#057DCD] text-[#E8EEF1] cursor-pointer hover:bg-[#1E3D58] hover:scale-105 rounded-sm shadow-md shadow-black"
//                             >
//                                 Live Detection
//                             </button>
//                             <button 
//                                 onClick={resetState} 
//                                 className="bg-red-500 px-5 py-2 text-[#E8EEF1] cursor-pointer hover:bg-[#1E3D58] hover:scale-105 rounded-sm shadow-md shadow-black"
//                             >
//                                 Back
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {isProcessing && (
//                 <div className="text-center mt-4 text-blue-500 animate-pulse" aria-live="polite">
//                     Processing Image, Please Wait...
//                 </div>
//             )}

//             {errorMessage && (
//                 <div className="text-center mt-4 text-red-600 font-bold" aria-live="polite">
//                     {errorMessage}
//                 </div>
//             )}

//             {showLiveFeed && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-2xl">
//                         <h2 className="text-xl font-bold text-blue-500 mb-4">Live Detection</h2>
//                         <div className="flex justify-center">
//                             <img 
//                                 src="http://127.0.0.1:8000/live_camera" 
//                                 alt="Live Camera Feed"
//                                 className="w-full h-auto rounded-lg shadow-md"
//                             />
//                         </div>
//                         <div className="mt-6 flex justify-end">
//                             <button 
//                                 onClick={stopLiveDetection} 
//                                 className="px-5 py-2 bg-red-500 text-white cursor-pointer hover:bg-red-600 rounded-sm shadow-md"
//                             >
//                                 Close Camera
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {isPopupOpen && personInfo && (
//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
//                         <h2 className="text-xl font-bold text-blue-500 mb-4">Image Details</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div className="flex justify-center">
//                                 <img src={generatedImage} alt="Generated" className="rounded-lg shadow-md w-full max-w-xs" />
//                             </div>
//                             <div className="text-gray-800 space-y-3">
//                                 <p><strong>Name:</strong> {personInfo.name}</p>
//                                 <p><strong>Location:</strong> {personInfo.location}</p> 
//                             </div>
//                         </div>
//                         <div className="mt-6 flex justify-end">
//                             <button onClick={() => setIsPopupOpen(false)} className="px-5 py-2 bg-[#1E3D58] text-[#E8EEF1] cursor-pointer hover:bg-[#057DCD] hover:scale-105 rounded-sm shadow-md shadow-black">
//                                 Close
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ImageDragger;

// "use client";
// import React, { useState, useRef } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// const ImageDragger = () => {
//     const defaultImage = "/DemoProfile.jpg";
//     const [uploadedImage, setUploadedImage] = useState(null);
//     const [generatedImage, setGeneratedImage] = useState(null);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const fileInputRef = useRef(null);

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         setUploadedImage(URL.createObjectURL(file));
//         setIsProcessing(true);

//         try {
//             const response = await fetch("http://127.0.0.1:8000/generate/", {
//                 method: "POST",
//                 body: file,
//             });
            
//             if (!response.ok) throw new Error("Failed to process image");

//             const blob = await response.blob();
//             setGeneratedImage(URL.createObjectURL(blob));
//         } catch (error) {
//             setErrorMessage(error.message || "Something went wrong");
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     return (
//         <motion.div 
//             initial={{ opacity: 0, y: 50 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-[#1e3d58] to-[#3b6978] rounded-lg shadow-xl text-white"
//         >
//             <h2 className="text-3xl font-bold text-center mb-6">Upload & Process Image</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Uploaded Image */}
//                 <motion.div whileHover={{ scale: 1.05 }} className="p-5 border rounded-lg bg-[#2e4b5b] flex justify-center items-center shadow-lg">
//                     <Image src={uploadedImage || defaultImage} alt="Uploaded Preview" className="w-full h-auto rounded-lg" width={300} height={300} />
//                 </motion.div>

//                 {/* Upload Box */}
//                 {!generatedImage ? (
//                     <motion.div 
//                         whileHover={{ scale: 1.05 }} 
//                         className="border-2 border-dashed p-6 rounded-lg bg-[#2e4b5b] flex flex-col items-center text-center cursor-pointer justify-center shadow-lg"
//                         onClick={() => fileInputRef.current.click()}
//                     >
//                         <p className="mb-3">Drag & Drop an Image Here</p>
//                         <button className="px-5 py-2 bg-[#43B0F1] text-white rounded-md hover:bg-[#1E3D58] transition">Select Image</button>
//                         <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
//                     </motion.div>
//                 ) : (
//                     <motion.div className="p-5 border rounded-lg bg-[#2e4b5b] flex flex-col items-center shadow-lg">
//                         <Image src={generatedImage} alt="Generated Preview" className="w-full h-auto rounded-lg" width={300} height={300} />
//                         <button 
//                             onClick={() => setGeneratedImage(null)} 
//                             className="mt-4 px-5 py-2 bg-red-500 text-white rounded-md hover:bg-[#1E3D58] transition"
//                         >
//                             Reset
//                         </button>
//                     </motion.div>
//                 )}
//             </div>

//             {isProcessing && <p className="text-center mt-4 text-yellow-400 animate-pulse">Processing Image, Please Wait...</p>}
//             {errorMessage && <p className="text-center mt-4 text-red-500">{errorMessage}</p>}
//         </motion.div>
//     );
// };

// export default ImageDragger;


// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { motion, useInView } from "framer-motion";

// const ImageDragger = () => {
//     const defaultImage = "/DemoProfile.jpg";
//     const [uploadedImage, setUploadedImage] = useState(null);
//     const [generatedImage, setGeneratedImage] = useState(null);
//     const [personInfo, setPersonInfo] = useState(null);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [isFetchingInfo, setIsFetchingInfo] = useState(false);
//     const [isPopupOpen, setIsPopupOpen] = useState(false);
//     const [showLiveFeed, setShowLiveFeed] = useState(false);
//     const sectionRef = useRef(null);
//     const isInView = useInView(sectionRef, { once: true });

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         resetState();
//         setUploadedImage(URL.createObjectURL(file));
//         setIsProcessing(true);

//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             const response = await fetch("http://127.0.0.1:8000/generate/", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!response.ok) throw new Error(`Failed: ${response.statusText}`);

//             const blob = await response.blob();
//             setGeneratedImage(URL.createObjectURL(blob));
//         } catch (error) {
//             setErrorMessage(error.message || "Something went wrong");
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     const handleViewInformation = async () => {
//         if (!generatedImage) return;

//         setIsFetchingInfo(true);
//         setErrorMessage("");
//         setPersonInfo(null);

//         try {
//             const response = await fetch("http://127.0.0.1:8000/get_matched_info/");
//             if (!response.ok) throw new Error(`Failed: ${response.statusText}`);

//             const data = await response.json();

//             if (data && data.name) {
//                 setPersonInfo(data);
//                 setIsPopupOpen(true);
//             } else {
//                 setPersonInfo({ name: "Not Found", location: "Unknown" });
//                 setIsPopupOpen(true);
//             }
//         } catch (error) {
//             setErrorMessage(error.message || "Error fetching details.");
//         } finally {
//             setIsFetchingInfo(false);
//         }
//     };

//     const handleLiveDetection = () => {
//         setShowLiveFeed(true);
//         setErrorMessage("");
//     };

//     const stopLiveDetection = () => {
//         setShowLiveFeed(false);
//     };

//     const resetState = () => {
//         setUploadedImage(null);
//         setGeneratedImage(null);
//         setPersonInfo(null);
//         setErrorMessage("");
//         setIsPopupOpen(false);
//         setShowLiveFeed(false);
//     };

//     return (
//         <motion.div
//             ref={sectionRef}
//             initial={{ opacity: 0, y: 100 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className=" mx-auto p-10  shadow-xl w-[100%] max-w-[1600px] mx-auto px-30"
//             style={{
//                 background: "linear-gradient(to right, #000000, #0a1128, #3b0076)", // Black to Navy Blue to Purple Gradient
//             }}
//         >
//             <h2 className="text-3xl font-bold text-center text-[#b3a4ff] mb-6">Upload & Generate Image</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="flex justify-center items-center p-5 border border-purple-500 rounded-lg shadow-md bg-black">
//                     <img src={uploadedImage || defaultImage} alt="Uploaded Preview" className="w-full h-auto rounded-lg shadow-lg" />
//                 </div>
//                 {!generatedImage ? (
//                     <motion.div 
//                         whileHover={{ scale: 1.05 }} 
//                         className="border-2 border-dashed border-[#b3a4ff] p-6 rounded-lg shadow-md bg-black flex flex-col items-center text-center cursor-pointer justify-center transition-all"
//                     >
//                         <p className="block mb-3 text-gray-400">Drag & Drop an Image Here</p>
//                         <label className="px-5 py-2 bg-[#3b0076] text-white cursor-pointer hover:bg-[#6b4eff] hover:scale-105 rounded-md shadow-md transition">
//                             Select Image
//                             <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
//                         </label>
//                     </motion.div>
//                 ) : (
//                     <div className="relative flex flex-col items-center p-5 border border-purple-500 rounded-lg shadow-md bg-black">
//                         <img src={generatedImage} alt="Generated Preview" className="w-full h-auto rounded-lg shadow-lg" />
//                         <div className="flex gap-4 mt-4">
//                             <button 
//                                 onClick={handleViewInformation} 
//                                 className="px-5 py-2 bg-[#3b0076] text-white hover:bg-[#6b4eff] hover:scale-105 rounded-md shadow-md transition"
//                                 disabled={isFetchingInfo}
//                             >
//                                 {isFetchingInfo ? "Fetching..." : "View Info"}
//                             </button>
//                             <button 
//                                 onClick={handleLiveDetection} 
//                                 className="px-5 py-2 bg-[#6b4eff] text-white hover:bg-[#3b0076] hover:scale-105 rounded-md shadow-md transition"
//                             >
//                                 Live Detection
//                             </button>
//                             <button 
//                                 onClick={resetState} 
//                                 className="bg-red-500 px-5 py-2 text-white hover:bg-red-700 hover:scale-105 rounded-md shadow-md transition"
//                             >
//                                 Back
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {isProcessing && (
//                 <div className="text-center mt-4 text-[#6b4eff] animate-pulse">Processing Image, Please Wait...</div>
//             )}

//             {errorMessage && (
//                 <div className="text-center mt-4 text-red-500 font-bold">{errorMessage}</div>
//             )}
//         </motion.div>
//     );
// };

// export default ImageDragger;





// "use client";
// import React, { useState, useRef } from "react";
// import { motion, useInView } from "framer-motion";

// const ImageDragger = () => {
//     const defaultImage = "/DemoProfile.jpg";
//     const [uploadedImage, setUploadedImage] = useState(null);
//     const [generatedImage, setGeneratedImage] = useState(null);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const [isFetchingInfo, setIsFetchingInfo] = useState(false);
//     const sectionRef = useRef(null);
//     const isInView = useInView(sectionRef, { once: true });

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         resetState();
//         setUploadedImage(URL.createObjectURL(file));
//         setIsProcessing(true);

//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             const response = await fetch("http://127.0.0.1:8000/generate/", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!response.ok) throw new Error(`Failed: ${response.statusText}`);

//             const blob = await response.blob();
//             setGeneratedImage(URL.createObjectURL(blob));
//         } catch (error) {
//             setErrorMessage(error.message || "Something went wrong");
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     const resetState = () => {
//         setUploadedImage(null);
//         setGeneratedImage(null);
//         setErrorMessage("");
//     };

//     return (
//         <motion.div
//             ref={sectionRef}
//             initial={{ opacity: 0, y: 100 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="w-full max-w-[1700px] mx-auto p-12 rounded-lg shadow-2xl border border-[#6b4eff]"
//             style={{
//                 background: "linear-gradient(to right, #000000, #0a1128, #3b0076)", 
//             }}
//         >
//             <h2 className="text-4xl font-extrabold text-center text-[#b3a4ff] mb-8 drop-shadow-lg">
//                 Upload & Generate Image
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Left: Uploaded Image Preview */}
//                 <motion.div 
//                     whileHover={{ scale: 1.02 }} 
//                     className="flex justify-center items-center p-6 border border-[#b3a4ff] rounded-lg shadow-lg bg-black transition-all"
//                 >
//                     <img 
//                         src={uploadedImage || defaultImage} 
//                         alt="Uploaded Preview" 
//                         className="w-full h-auto rounded-lg shadow-lg"
//                     />
//                 </motion.div>

//                 {/* Right: Upload or Generated Image */}
//                 {!generatedImage ? (
//                     <motion.div 
//                         whileHover={{ scale: 1.05 }} 
//                         className="border-2 border-dashed border-[#b3a4ff] p-8 rounded-lg shadow-lg bg-black flex flex-col items-center text-center cursor-pointer justify-center transition-all"
//                     >
//                         <p className="text-lg mb-3 text-gray-400">Drag & Drop an Image Here</p>
//                         <label className="px-6 py-3 bg-[#3b0076] text-white cursor-pointer hover:bg-[#6b4eff] hover:scale-110 rounded-md shadow-lg transition-all">
//                             Select Image
//                             <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
//                         </label>
//                     </motion.div>
//                 ) : (
//                     <motion.div 
//                         whileHover={{ scale: 1.02 }} 
//                         className="relative flex flex-col items-center p-6 border border-[#b3a4ff] rounded-lg shadow-lg bg-black transition-all"
//                     >
//                         <img 
//                             src={generatedImage} 
//                             alt="Generated Preview" 
//                             className="w-full h-auto rounded-lg shadow-lg"
//                         />
//                         <div className="flex gap-6 mt-5">
//                             <button 
//                                 className="px-6 py-2 bg-[#3b0076] text-white hover:bg-[#6b4eff] hover:scale-110 rounded-md shadow-lg transition-all"
//                                 disabled={isFetchingInfo}
//                             >
//                                 {isFetchingInfo ? "Fetching..." : "View Info"}
//                             </button>
//                             <button 
//                                 className="px-6 py-2 bg-[#6b4eff] text-white hover:bg-[#3b0076] hover:scale-110 rounded-md shadow-lg transition-all"
//                             >
//                                 Live Detection
//                             </button>
//                             <button 
//                                 onClick={resetState} 
//                                 className="bg-red-500 px-6 py-2 text-white hover:bg-red-700 hover:scale-110 rounded-md shadow-lg transition-all"
//                             >
//                                 Back
//                             </button>
//                         </div>
//                     </motion.div>
//                 )}
//             </div>

//             {/* Loading Animation */}
//             {isProcessing && (
//                 <motion.div 
//                     initial={{ opacity: 0 }} 
//                     animate={{ opacity: 1 }} 
//                     transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }} 
//                     className="text-center mt-6 text-[#6b4eff] text-lg animate-pulse"
//                 >
//                     Processing Image, Please Wait...
//                 </motion.div>
//             )}

//             {/* Error Message */}
//             {errorMessage && (
//                 <motion.div 
//                     initial={{ opacity: 0 }} 
//                     animate={{ opacity: 1 }} 
//                     transition={{ duration: 0.5 }}
//                     className="text-center mt-6 text-red-500 font-bold"
//                 >
//                     {errorMessage}
//                 </motion.div>
//             )}
//         </motion.div>
//     );
// };

// export default ImageDragger;







// "use client";
// import React, { useState, useRef } from "react";
// import { motion, useInView } from "framer-motion";

// const ImageDragger = () => {
//     const defaultImage = "/DemoProfile.jpg";
//     const [uploadedImage, setUploadedImage] = useState(null);
//     const [generatedImage, setGeneratedImage] = useState(null);
//     const [isProcessing, setIsProcessing] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const sectionRef = useRef(null);
//     const isInView = useInView(sectionRef, { once: true });

//     const handleFileChange = async (event) => {
//         const file = event.target.files[0];
//         if (!file) return;

//         resetState();
//         setUploadedImage(URL.createObjectURL(file));
//         setIsProcessing(true);

//         const formData = new FormData();
//         formData.append("file", file);

//         try {
//             const response = await fetch("http://127.0.0.1:8000/generate/", {
//                 method: "POST",
//                 body: formData,
//             });

//             if (!response.ok) throw new Error(`Failed: ${response.statusText}`);

//             const blob = await response.blob();
//             setGeneratedImage(URL.createObjectURL(blob));
//         } catch (error) {
//             setErrorMessage(error.message || "Something went wrong");
//         } finally {
//             setIsProcessing(false);
//         }
//     };

//     const resetState = () => {
//         setUploadedImage(null);
//         setGeneratedImage(null);
//         setErrorMessage("");
//     };

//     return (
//         <motion.div
//             ref={sectionRef}
//             initial={{ opacity: 0, y: 100 }}
//             animate={isInView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//             className="w-full max-w-[1600px] mx-auto p-12  shadow-2xl "
//             style={{
//                 background: "linear-gradient(to left, #000000, #000000,#000000)", 
//             }}
//         >
//             {/* Section Title */}
//             <h2 className="text-4xl font-extrabold text-center text-[#b3a4ff] mb-8 drop-shadow-lg">
//                 AI-Powered Image Processing
//             </h2>

//             {/* New Layout - Side by Side with Fancy Effects */}
//             <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                
//                 {/* LEFT: Upload Box */}
//                 <motion.div 
//                     whileHover={{ scale: 1.05 }} 
//                     className="flex flex-col items-center justify-center p-8 border border-[#b3a4ff] rounded-lg shadow-lg bg-black w-full md:w-1/2 transition-all"
//                 >
//                     {!uploadedImage ? (
//                         <>
//                             <p className="text-lg text-gray-400 mb-4">Drag & Drop an Image</p>
//                             <label className="px-6 py-3 bg-[#3b0076] text-white cursor-pointer hover:bg-[#6b4eff] hover:scale-110 rounded-md shadow-lg transition">
//                                 Select Image
//                                 <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
//                             </label>
//                         </>
//                     ) : (
//                         <img 
//                             src={uploadedImage} 
//                             alt="Uploaded Preview" 
//                             className="w-full max-w-xs rounded-lg shadow-lg"
//                         />
//                     )}
//                 </motion.div>

//                 {/* RIGHT: Processing & Generated Image Box */}
//                 <motion.div 
//                     whileHover={{ scale: 1.02 }} 
//                     className="flex flex-col items-center justify-center p-8 border border-[#b3a4ff] rounded-lg shadow-lg bg-black w-full md:w-1/2 transition-all"
//                 >
//                     {generatedImage ? (
//                         <>
//                             <img 
//                                 src={generatedImage} 
//                                 alt="Generated Image" 
//                                 className="w-full max-w-xs rounded-lg shadow-lg"
//                             />
//                             <div className="flex gap-4 mt-5">
//                                 <button 
//                                     className="px-6 py-2 bg-[#3b0076] text-white hover:bg-[#6b4eff] hover:scale-110 rounded-md shadow-lg transition"
//                                 >
//                                     View Info
//                                 </button>
//                                 <button 
//                                     className="px-6 py-2 bg-[#6b4eff] text-white hover:bg-[#3b0076] hover:scale-110 rounded-md shadow-lg transition"
//                                 >
//                                     Live Detection
//                                 </button>
//                                 <button 
//                                     onClick={resetState} 
//                                     className="bg-red-500 px-6 py-2 text-white hover:bg-red-700 hover:scale-110 rounded-md shadow-lg transition"
//                                 >
//                                     Reset
//                                 </button>
//                             </div>
//                         </>
//                     ) : (
//                         <p className="text-lg text-gray-400">Waiting for Image Upload...</p>
//                     )}
//                 </motion.div>
//             </div>

//             {/* Loading Animation */}
//             {isProcessing && (
//                 <motion.div 
//                     initial={{ opacity: 0 }} 
//                     animate={{ opacity: 1 }} 
//                     transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }} 
//                     className="text-center mt-6 text-[#6b4eff] text-lg animate-pulse"
//                 >
//                     Processing Image, Please Wait...
//                 </motion.div>
//             )}

//             {/* Error Message */}
//             {errorMessage && (
//                 <motion.div 
//                     initial={{ opacity: 0 }} 
//                     animate={{ opacity: 1 }} 
//                     transition={{ duration: 0.5 }}
//                     className="text-center mt-6 text-red-500 font-bold"
//                 >
//                     {errorMessage}
//                 </motion.div>
//             )}
//         </motion.div>
//     );
// };

// export default ImageDragger;

"use client";
import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const ImageDragger = () => {
    const defaultImage = "/DemoProfile.jpg";
    const [uploadedImage, setUploadedImage] = useState(null);
    const [generatedImage, setGeneratedImage] = useState(null);
    const [matchedInfo, setMatchedInfo] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDetecting, setIsDetecting] = useState(false);
    const [showLiveFeed, setShowLiveFeed] = useState(false);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true });

    // Function to fetch matched person's info
    const fetchMatchedInfo = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/get_matched_info/");
            if (!response.ok) {
                throw new Error("No matching person found");
            }
            const data = await response.json();
            setMatchedInfo(data);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    // Function to upload image and get generated colored image
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        resetState();
        setUploadedImage(URL.createObjectURL(file));
        setIsProcessing(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:8000/generate/", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) throw new Error(`Failed: ${response.statusText}`);

            const blob = await response.blob();
            setGeneratedImage(URL.createObjectURL(blob));
        } catch (error) {
            setErrorMessage(error.message || "Something went wrong");
        } finally {
            setIsProcessing(false);
        }
    };

    // Function to start live detection - now opens the camera modal
    const handleLiveDetection = () => {
        setShowLiveFeed(true);
        setErrorMessage("");
        setIsDetecting(true);
    };

    // Function to stop live detection
    const stopLiveDetection = () => {
        setShowLiveFeed(false);
        setIsDetecting(false);
    };

    const resetState = () => {
        setUploadedImage(null);
        setGeneratedImage(null);
        setMatchedInfo(null);
        setErrorMessage("");
        setShowLiveFeed(false);
        setIsDetecting(false);
    };

    return (
        <motion.div
            ref={sectionRef}
            initial={{ opacity: 0, y: 100 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[1600px] mx-auto p-12 shadow-2xl"
            style={{ background: "linear-gradient(to left, #000000, #000000, #000000)" }}
        >
            <h2 className="text-4xl font-extrabold text-center text-[#b3a4ff] mb-8 drop-shadow-lg">
                AI-Powered Image Processing
            </h2>

            <div className="flex flex-col md:flex-row justify-center items-center gap-10">
                {/* Upload Box */}
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center justify-center p-8 border border-[#b3a4ff] rounded-lg shadow-lg bg-black w-full md:w-1/2 transition-all"
                >
                    {!uploadedImage ? (
                        <>
                            <p className="text-lg text-gray-400 mb-4">Drag & Drop an Image</p>
                            <label className="px-6 py-3 bg-[#3b0076] text-white cursor-pointer hover:bg-[#6b4eff] hover:scale-110 rounded-md shadow-lg transition">
                                Select Image
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>
                        </>
                    ) : (
                        <img src={uploadedImage} alt="Uploaded Preview" className="w-full max-w-xs rounded-lg shadow-lg" />
                    )}
                </motion.div>

                {/* Processing & Generated Image Box */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col items-center justify-center p-8 border border-[#b3a4ff] rounded-lg shadow-lg bg-black w-full md:w-1/2 transition-all"
                >
                    {generatedImage ? (
                        <>
                            <img src={generatedImage} alt="Generated Image" className="w-full max-w-xs rounded-lg shadow-lg" />
                            <div className="flex gap-4 mt-5">
                                <button
                                    onClick={fetchMatchedInfo}
                                    className="px-6 py-2 bg-[#3b0076] text-white hover:bg-[#6b4eff] hover:scale-110 rounded-md shadow-lg transition"
                                >
                                    View Info
                                </button>
                                <button
                                    onClick={handleLiveDetection}
                                    className="px-6 py-2 bg-[#6b4eff] text-white hover:bg-[#3b0076] hover:scale-110 rounded-md shadow-lg transition"
                                >
                                    Live Detection
                                </button>
                                <button
                                    onClick={resetState}
                                    className="bg-red-500 px-6 py-2 text-white hover:bg-red-700 hover:scale-110 rounded-md shadow-lg transition"
                                >
                                    Reset
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-lg text-gray-400">Waiting for Image Upload...</p>
                    )}
                </motion.div>
            </div>

            {/* Loading Animation */}
            {isProcessing && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="text-center mt-6 text-[#6b4eff] text-lg animate-pulse"
                >
                    Processing Image, Please Wait...
                </motion.div>
            )}

            {/* Live Detection Loading */}
            {isDetecting && !showLiveFeed && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    className="text-center mt-6 text-[#6b4eff] text-lg animate-pulse"
                >
                    Running Live Detection...
                </motion.div>
            )}

            {/* Error Message */}
            {errorMessage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mt-6 text-red-500 font-bold"
                >
                    {errorMessage}
                </motion.div>
            )}

            {/* Live Feed Modal - From first code */}
            {showLiveFeed && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-900 p-6 rounded-lg shadow-xl w-4/5 max-w-3xl border border-[#b3a4ff]"
                    >
                        <h2 className="text-2xl font-bold text-[#b3a4ff] mb-4">Live Detection</h2>
                        <div className="flex justify-center">
                            <img 
                                src="http://127.0.0.1:8000/live_camera" 
                                alt="Live Camera Feed"
                                className="w-full h-auto rounded-lg shadow-md border border-gray-700"
                            />
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button 
                                onClick={stopLiveDetection} 
                                className="px-6 py-2 bg-red-600 text-white cursor-pointer hover:bg-red-700 hover:scale-105 rounded-md shadow-lg transition"
                            >
                                Close Camera
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Display Matched Person's Info */}
            {matchedInfo && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 p-6 bg-gray-900 text-white rounded-lg shadow-lg"
                >
                    <h3 className="text-2xl font-bold text-[#b3a4ff] mb-4">Matched Person Details</h3>
                    <p><span className="font-bold">ID:</span> {matchedInfo.id}</p>
                    <p><span className="font-bold">Name:</span> {matchedInfo.name}</p>
                    <p><span className="font-bold">Age:</span> {matchedInfo.age}</p>
                    <p><span className="font-bold">Location:</span> {matchedInfo.location}</p>
                    <p><span className="font-bold">Marital Status:</span> {matchedInfo.marital_status}</p>
                    <p><span className="font-bold">Criminal History:</span> {matchedInfo.criminal_history}</p>
                    {/* <p><span className="font-bold">Similarity Score:</span> {matchedInfo.similarity}</p> */}
                </motion.div>
            )}
        </motion.div>
    );
};

export default ImageDragger;