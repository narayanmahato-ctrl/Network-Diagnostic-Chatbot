import React from 'react';
import './ProfilePage.css';

export default function ProfilePage({ onBack, systemInfo }) {
  return (
    <aside className="dashboard-panel profile-page">
      <div className="profile-header">
        <button type="button" className="back-pill" onClick={onBack}>
          ← Back
        </button>
        <div className="profile-title-group">
          <p className="dashboard-label">Profile Overview</p>
          <h2>Orion Node</h2>
          <p className="profile-role">Network Intelligence Analyst</p>
        </div>
      </div>

      <div className="profile-intro">
        <div className="profile-avatar large">NK</div>
        <div>
          <p className="profile-name">Nexus Keeper</p>
          <p className="profile-detail">Expert in packet diagnostics, threat detection, and autonomous network remediation.</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <span>Completed Scans</span>
          <strong>1,294</strong>
        </div>
        <div className="stat-card">
          <span>Uptime</span>
          <strong>99.98%</strong>
        </div>
        <div className="stat-card">
          <span>Support Tickets</span>
          <strong>12</strong>
        </div>
      </div>

      <div className="profile-details">
        <div>
          <h3>Security Clearance</h3>
          <p>Tier 4 - Full network topology access with encrypted audit logging.</p>
        </div>
        <div>
          <h3>Operating Sector</h3>
          <p>Node 7 Orbital Relay - Night Ops preferred shift.</p>
        </div>
      </div>

      <div className="profile-footer">
        <div>
          <span>Status</span>
          <strong>ACTIVE</strong>
        </div>
        {systemInfo && (
          <div>
            <span>Host</span>
            <strong>{systemInfo.hostname}</strong>
            <span className="ip-entry">IP</span>
            <strong>{systemInfo.ipAddress}</strong>
          </div>
        )}
      </div>
    </aside>
  );
}
