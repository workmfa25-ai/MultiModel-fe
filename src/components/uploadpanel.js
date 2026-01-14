import { useRef, useState } from "react";
import { FileUp, Upload } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function UploadPanel({
  onSuccess,
  setDocAnalysis,
  setImageAnalysis,
}) {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (file) => {
    if (!file) return;

    const isAudio = file.type.startsWith("audio/");
    const isImage = file.type.startsWith("image/");
    const isDocument =
      file.type === "application/pdf" ||
      file.type === "text/plain" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document";

    if (!isAudio && !isImage && !isDocument) {
      toast.error("Only audio, image, or document files are allowed");
      return;
    }

    setSelectedFile(file);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    const isAudio = selectedFile.type.startsWith("audio/");
    const isImage = selectedFile.type.startsWith("image/");
    const isDoc = !isAudio && !isImage;

    let endpoint = "";

    if (isAudio) {
      endpoint = "http://127.0.0.1:8000/api/transcribe";
    } else if (isImage) {
      endpoint = "http://127.0.0.1:8000/extract";
    } else {
      endpoint = "http://127.0.0.1:8000/documents/upload";
    }

    const formData = new FormData();

    // Match backend parameter names
    if (isAudio) {
      formData.append("audio_file", selectedFile);
    } else {
      // both /extract and /documents/upload expect "file"
      formData.append("file", selectedFile);
    }

    setUploading(true);

    try {
      const res = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("File uploaded successfully");

      if (isAudio) {
        onSuccess?.(res.data);
      } else if (isImage) {
        setImageAnalysis?.(res.data); // or whatever state you use for image results
      } else {
        setDocAnalysis?.(res.data);
      }

      setSelectedFile(null);
      if (inputRef.current) inputRef.current.value = null;

      console.log(res.data, "res.data");
    } catch (err) {
      toast.error(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          err.message ||
          "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  // const uploadFile = async () => {
  //   if (!selectedFile) {
  //     toast.error("Please select a file first");
  //     return;
  //   }

  //   const isAudio = selectedFile.type.startsWith("audio/");
  //   const endpoint = isAudio
  //     ? "http://127.0.0.1:8000/api/transcribe"
  //     : "http://127.0.0.1:8000/documents/upload";

  //   const formData = new FormData();

  //   // IMPORTANT: match backend parameter names
  //   if (isAudio) {
  //     formData.append("audio_file", selectedFile);
  //   } else {
  //     formData.append("file", selectedFile);
  //   }

  //   setUploading(true);

  //   try {
  //     const res = await axios.post(endpoint, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });

  //     toast.success("File uploaded successfully");

  //     if (isAudio) {
  //       onSuccess?.(res.data);
  //     } else {
  //       setDocAnalysis?.(res.data);
  //     }

  //     setSelectedFile(null);
  //     if (inputRef.current) inputRef.current.value = null;
  //     console.log(res.data,'res.data');

  //   } catch (err) {
  //     toast.error(
  //       err?.response?.data?.detail ||
  //         err?.response?.data?.message ||
  //         err.message ||
  //         "Upload failed"
  //     );
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  return (
    <div className="col-span-1 p-4 rounded-lg bg-panel border border-border">
      <h3 className="text-accent mb-3">Upload Asset</h3>

      {/* Drop / Select Area */}
      <div
        onClick={() => inputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFileSelect(e.dataTransfer.files[0]);
        }}
        className="flex flex-col items-center justify-center gap-3
          border border-dashed border-[#2a3a33] rounded p-6
          cursor-pointer hover:border-accent transition"
      >
        <FileUp size={36} className="text-accent" />

        <span className="text-sm text-gray-300">
          {selectedFile ? selectedFile.name : "Click or drop file to select"}
        </span>

        <span className="text-xs text-gray-500">
          Documents • Images • Audio • Video
        </span>
      </div>

      {/* Upload Button */}
      <button
        onClick={uploadFile}
        disabled={!selectedFile || uploading}
        className={`mt-4 w-full flex items-center justify-center gap-2
          px-4 py-2 rounded-md text-sm font-medium transition
          ${
            uploading || !selectedFile
              ? "bg-gray-700 text-gray-400 cursor-not-allowed"
              : "bg-accent text-black hover:opacity-90"
          }
        `}
      >
        <Upload size={16} />
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="audio/*,.pdf,.doc,.docx,.txt, .jpg, .jpeg"
        onChange={(e) => handleFileSelect(e.target.files[0])}
      />
    </div>
  );
}
