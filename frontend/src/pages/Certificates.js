import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import "./Certificates.css";
import certificateBg from "../Assets/cert.png"; // TreasureFunded background

const TreasureFundedCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState("");
  const [currentCert, setCurrentCert] = useState(null);
  const [introVisible, setIntroVisible] = useState(true);
  const [profitInputVisible, setProfitInputVisible] = useState(false);
  const [profitAmount, setProfitAmount] = useState("");

  const username = localStorage.getItem("username");

  useEffect(() => {
    if (!username) return;

    
   axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/certificate/user/${username}`)

        // .get(`http://treassurefunded/api/certificate/user/${username}`)
      .then((res) => {
        let data = res.data;

        if (data.length < 3) {
          data = [
            ...data,
            {
              _id: "challenge2",
              userName: username,
              challengeName: "Treassure Challenge",
              achievement: "Completed Treassure Challenge",
              profitShare: "",
              date: new Date(),
            },
            {
              _id: "challenge3",
              userName: username,
              challengeName: "Lite Challenge",
              achievement: "Completed Lite Challenge",
              profitShare: "",
              date: new Date(),
            },
          ];
        }

        setCertificates(data);
      })
      .catch((err) => console.log(err));
  }, [username]);

  const handleChallengeSelect = (e) => {
    const cert = certificates.find((c) => c._id === e.target.value);
    setSelectedChallenge(e.target.value);
    setCurrentCert(cert);
    setProfitInputVisible(true);
  };

  const handleShowCertificate = () => {
    if (!profitAmount) {
      alert("Please enter your profit share amount!");
      return;
    }
    setCurrentCert((prev) => ({ ...prev, profitShare: `$${profitAmount}` }));
    setProfitInputVisible(false);
  };

  const downloadCertificate = () => {
    if (!currentCert) return;
    const input = document.getElementById("certificate");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${currentCert.userName || "certificate"}_certificate.pdf`);
    });
  };

  if (introVisible)
    return (
      <div className="intro-page">
        <h1>Welcome, {username}!</h1>
        <p>Here you can view and download your TreasureFunded certificates.</p>
        <button onClick={() => setIntroVisible(false)}>View Challenges</button>
      </div>
    );

  return (
    <div className="certificate-page">
      <h2 className="page-title">Select Your Challenge</h2>

      {/* Challenge Dropdown */}
      <div className="certificate-dropdown">
        <label>Select Challenge: </label>
        <select value={selectedChallenge} onChange={handleChallengeSelect}>
          <option value="">-- Choose --</option>
          {certificates.map((cert) => (
            <option key={cert._id} value={cert._id}>
              {cert.challengeName}
            </option>
          ))}
        </select>
      </div>

      {/* Profit Input */}
      {profitInputVisible && (
        <div className="profit-input">
          <label>Enter Your Profit Share Amount:</label>
          <input
            type="number"
            placeholder="e.g., 5000"
            value={profitAmount}
            onChange={(e) => setProfitAmount(e.target.value)}
          />
          <button onClick={handleShowCertificate}>Show Certificate</button>
        </div>
      )}

      {/* Certificate Card */}
      {currentCert && !profitInputVisible && (
        <div
          id="certificate"
          className="certificate-card"
          style={{ backgroundImage: `url(${certificateBg})` }}
        >
          <div className="certificate-header">
            <h1>TreassureFunded</h1>
            <h2>PROFIT SPLIT CERTIFICATE</h2>
          </div>

          <div className="certificate-body">
            <p className="formal-text">This is to certify that</p>
            <h2 className="cert-name">{currentCert.userName}</h2>
            <p className="formal-text">
              has successfully completed the <strong>{currentCert.challengeName}</strong> and achieved
              remarkable results.
            </p>
            <p className="achievement">{currentCert.achievement}</p>
            {currentCert.profitShare && (
              <p className="profit-share">Profit Share Awarded: {currentCert.profitShare}</p>
            )}
            <p className="date">
              Awarded on: {new Date(currentCert.date).toLocaleDateString()}
            </p>
            <p className="formal-text">
              In recognition of outstanding performance and contribution to TreassureFunded.
            </p>
          </div>

          <div className="certificate-footer">
            <QRCodeSVG
              value={`https://treasurefunded.com/certificate/view/${currentCert._id}`}
              size={120}
              fgColor="#fff"
              bgColor="transparent"
            />
            <p>Scan to verify</p>
          </div>

          <div className="certificate-signature">
            <p>David Rechards</p>
            <small>CEO, TreassureFunded</small>
          </div>
        </div>
      )}

      {!profitInputVisible && currentCert && (
        <button className="certificate-btn" onClick={downloadCertificate}>
          Download Certificate
        </button>
      )}
    </div>
  );
};

export default TreasureFundedCertificates;
