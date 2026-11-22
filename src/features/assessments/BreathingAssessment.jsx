
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Video, Upload, ShieldCheck } from "lucide-react";

export default function BreathingAssessment() {

  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [consent, setConsent] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFile = (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("video/")) {
      alert("Please select a video file.");
      return;
    }

    if (selectedFile.size > 100 * 1024 * 1024) {
      alert("Please select a video under 100MB.");
      return;
    }

    if (preview) URL.revokeObjectURL(preview);

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const continueAssessment = () => {
    if (!file || !consent) return;

    // Temporary local development handoff.
    // Actual private video upload and consent recording
    // will be implemented through the Django API.

    sessionStorage.setItem(
      "assessment_draft",
      JSON.stringify({
        fileName: file.name,
        consent,
        consentVersion: "v1",
      })
    );

    navigate("/practices");
  };

  return (
    <div className="onboarding-page">

      <div className="onboarding-card">

        <p className="eyebrow">STEP 4 OF 4</p>

        <h1>Your breathing assessment</h1>

        <p className="muted">
          Let's understand your natural breathing pattern.
        </p>

        <div className="instruction-card">
          <h3>Before recording</h3>
          <ul>
            <li>Sit upright in a comfortable position.</li>
            <li>Place your phone at chest height.</li>
            <li>Record 60 seconds of natural breathing.</li>
            <li>Do not force or exaggerate your breathing.</li>
          </ul>
        </div>

        <label className="upload-area">

          {preview ? (
            <video
              src={preview}
              controls
              className="video-preview"
            />
          ) : (
            <>
              <Video size={35} />
              <strong>Select your breathing video</strong>
              <span>MP4, MOV or another supported video format</span>
              <Upload size={20} />
            </>
          )}

          <input
            type="file"
            accept="video/*"
            onChange={handleFile}
            hidden
          />

        </label>

        {file && (
          <div className="selected-file">
            {file.name}
            <span>{(file.size / 1024 / 1024).toFixed(1)} MB</span>
          </div>
        )}

        <label className="consent-control">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) =>
              setConsent(event.target.checked)
            }
          />

          <span>
            I agree to my video being reviewed by an
            authorised coach for my breathing assessment.
          </span>
        </label>

        <div className="privacy-note">
          <ShieldCheck size={18} />
          Your video should only be accessible to authorised
          reviewers.
        </div>

        <button
          className="btn-primary full-width"
          disabled={!file || !consent}
          onClick={continueAssessment}
        >
          Continue to practices
        </button>

      </div>
    </div>
  );
}
