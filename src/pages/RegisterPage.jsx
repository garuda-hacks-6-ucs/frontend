import React, { useState } from "react";
import Tesseract from "tesseract.js";
import {
  User,
  Upload,
  CheckCircle,
  XCircle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Shield,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { delegate } from "../services/ft";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [ktpFile, setKtpFile] = useState(null);
  const [ocrName, setOcrName] = useState("");
  const [ocrText, setOcrText] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const navigate = useNavigate();

  const steps = [
    {
      id: 1,
      title: "Personal Info",
      icon: User,
      description: "Enter your full name as on ID",
    },
    {
      id: 2,
      title: "Upload ID",
      icon: Upload,
      description: "Upload clear ID card photo",
    },
    {
      id: 3,
      title: "Verification",
      icon: Shield,
      description: "Automatic verification process",
    },
    {
      id: 4,
      title: "Complete",
      icon: CheckCircle,
      description: "Verification successful",
    },
  ];

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const submit = async () => {
    Swal.fire({
      title: "Processing KTP Registration",
      text: "Please wait while we process your KTP data...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const result = await delegate(String(new Date().getTime())); // Replace with your actual registration function
      if (result) {
        Swal.close();
        await Swal.fire({
          title: "Registration Successful",
          text: "Your KTP data has been successfully registered.",
          icon: "success",
          confirmButtonText: "Close",
        });
        navigate("/");
      } else {
        Swal.close();
        await Swal.fire({
          title: "Registration Failed",
          text: "An error occurred while registering your KTP data.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      Swal.close();
      await Swal.fire({
        title: "Unexpected Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
      console.error(error);
    }
  };

  const handleKtpFileChange = (e) => {
    setKtpFile(e.target.files[0]);
  };

  const extractNameFromKTP = (text) => {
    const lines = text.split("\n");
    const nameLine = lines.find((line) => line.toLowerCase().includes("nama"));
    if (nameLine) {
      const name = nameLine
        .split(/nama\s*[:=]/i)[1]
        ?.trim()
        ?.toLowerCase();
      return name || "";
    }
    return "";
  };

  const normalizeName = (name) => {
    return name.replace(/[^a-zA-Z]/g, "").toLowerCase();
  };

  const handleVerification = async () => {
    if (!fullName || !ktpFile) {
      setStatus("❌ Name and ID card photo are required.");
      return;
    }

    setLoading(true);
    setCurrentStep(3);
    setStatus("🔍 Processing OCR...");

    try {
      const result = await Tesseract.recognize(ktpFile, "eng", {
        logger: (m) => console.log(m),
      });

      const rawText = result.data.text;
      setOcrText(rawText);

      const extractedName = extractNameFromKTP(rawText);
      setOcrName(extractedName);

      const fullNameNormalized = normalizeName(fullName);
      const extractedNameNormalized = normalizeName(extractedName);
      const rawTextNormalized = normalizeName(rawText);

      if (
        extractedNameNormalized === fullNameNormalized ||
        rawTextNormalized.includes(fullNameNormalized)
      ) {
        setStatus("✅ Name matches with ID card.");
        setVerificationResult("success");
        setTimeout(() => setCurrentStep(4), 1500);
      } else {
        setStatus("❌ Name does not match with ID card.");
        setVerificationResult("failed");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to perform OCR.");
      setVerificationResult("failed");
    }

    setLoading(false);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const moveToHome = () => {
    navigate("/");
  };

  const resetProcess = () => {
    setCurrentStep(1);
    setFullName("");
    setKtpFile(null);
    setOcrName("");
    setOcrText("");
    setStatus("");
    setVerificationResult(null);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-xl">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-purple-900 mb-2">
          KYC Verification
        </h1>
        <p className="text-gray-600">Verify your identity with your ID card</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const isAccessible = currentStep >= step.id;

            return (
              <div key={step.id} className="flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      isCompleted
                        ? "bg-green-500 text-white shadow-lg"
                        : isActive
                        ? "bg-purple-600 text-white shadow-lg scale-110"
                        : isAccessible
                        ? "bg-white border-2 border-purple-200 text-purple-600"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 ${
                        isCompleted ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
                <div className="mt-3 text-center">
                  <p
                    className={`font-semibold text-sm ${
                      isActive
                        ? "text-purple-600"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 overflow-hidden">
        {currentStep === 1 && (
          <div className="p-6">
            <div className="text-center mb-6">
              <User className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-purple-900 mb-2">
                Personal Information
              </h2>
              <p className="text-gray-600">
                Enter your full name as it appears on your ID card
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name (as on ID card)
              </label>
              <input
                type="text"
                value={fullName}
                onChange={handleFullNameChange}
                placeholder="e.g. JOHN DOE SMITH"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
              />

              <div className="mt-6 flex justify-end">
                <button
                  onClick={nextStep}
                  disabled={!fullName.trim()}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                    fullName.trim()
                      ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="p-6">
            <div className="text-center mb-6">
              <Upload className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              <h2 className="text-xl font-bold text-purple-900 mb-2">
                Upload ID Card Photo
              </h2>
              <p className="text-gray-600">
                Make sure the ID card photo is clear and readable
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ID Card File
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleKtpFileChange}
                    className="hidden"
                    id="ktp-upload"
                  />
                  <label
                    htmlFor="ktp-upload"
                    className={`w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 block ${
                      ktpFile
                        ? "border-purple-400 bg-purple-50"
                        : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                    }`}
                  >
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    {ktpFile ? (
                      <div>
                        <p className="text-purple-600 font-semibold text-sm">
                          {ktpFile.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          File successfully selected
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-600 font-semibold text-sm">
                          Click to upload ID card
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Format: JPG, PNG, max 5MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleVerification}
                  disabled={!ktpFile}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                    ktpFile
                      ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Start Verification
                  <Shield className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="relative mx-auto mb-4">
                {loading ? (
                  <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto" />
                ) : verificationResult === "success" ? (
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                ) : verificationResult === "failed" ? (
                  <XCircle className="w-12 h-12 text-red-500 mx-auto" />
                ) : (
                  <Clock className="w-12 h-12 text-purple-600 mx-auto" />
                )}
              </div>
              <h2 className="text-xl font-bold text-purple-900 mb-2">
                {loading ? "Processing Verification" : "Verification Result"}
              </h2>
              <p className="text-gray-600 text-sm">
                {loading
                  ? "Processing OCR and matching data..."
                  : "Verification process completed"}
              </p>
            </div>

            <div className="max-w-lg mx-auto">
              {status && (
                <div
                  className={`p-3 rounded-xl mb-4 text-center font-semibold text-sm ${
                    status.includes("✅")
                      ? "bg-green-50 border-2 border-green-200 text-green-700"
                      : status.includes("❌")
                      ? "bg-red-50 border-2 border-red-200 text-red-700"
                      : "bg-blue-50 border-2 border-blue-200 text-blue-700"
                  }`}
                >
                  {status}
                </div>
              )}

              {ocrName && !loading && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                    Verification Details:
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-gray-600">Name from OCR:</span>
                      <span className="ml-2 font-semibold">{ocrName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Input name:</span>
                      <span className="ml-2 font-semibold">{fullName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">
                        Normalization status:
                      </span>
                      <span
                        className={`ml-2 font-semibold ${
                          normalizeName(ocrName) === normalizeName(fullName)
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {normalizeName(ocrName) === normalizeName(fullName)
                          ? "Match"
                          : "No Match"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {verificationResult === "failed" && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={resetProcess}
                    className="px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 4: Selesai */}
        {currentStep === 4 && (
          <div className="p-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-2xl">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-green-600 mb-3">
                Verification Successful!
              </h2>
              <p className="text-gray-600 mb-6">
                Your identity has been successfully verified. You can now
                proceed to the next process.
              </p>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 max-w-md mx-auto mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold text-green-800 text-sm">
                    Verification Details
                  </h3>
                </div>
                <div className="text-xs text-green-700 space-y-2">
                  <div className="flex justify-between">
                    <span>Name:</span>
                    <span className="font-semibold">{fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="font-semibold text-green-600">
                      Verified
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="font-semibold">
                      {new Date().toLocaleDateString("en-US")}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={submit}
                className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Submit to Blockchain
              </button>
            </div>
          </div>
        )}

        {ocrText && currentStep === 3 && !loading && (
          <div className="border-t-2 border-gray-100 p-6 bg-gray-50">
            <details className="cursor-pointer">
              <summary className="font-semibold text-gray-700 mb-4">
                🧾 Detail Hasil OCR
              </summary>
              <pre className="bg-white p-4 rounded-lg text-xs text-gray-600 max-h-40 overflow-y-auto font-mono border">
                {ocrText}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
