import React from 'react';
import './DashboardPanel.css';

export default function DashboardPanel({ systemInfo, onViewProfile, isActive, onToggleActive }) {
  return (
    <aside className="dashboard-panel profile-sidebar">
     {/* <div className="dashboard-top profile-top">
    <div className="profile-avatar">NCM</div> */}
        {/* <div className="profile-meta">
          <p className="dashboard-label">Agent Sidebar</p>
          <h2>NARAYAN CH MAHATO</h2>
          <p className="profile-role">Network Intelligence Analyst</p>
        </div> */}
        {/* <button
          className={`small-pill ${isActive ? 'active-mode' : 'inactive-mode'}`}
          onDoubleClick={onToggleActive}
          title="Double-click to toggle active mode"
        >
          {isActive ? 'ACTIVE' : 'INACTIVE'}
        </button>
      </div> */}

      {/* <div className="profile-bio">
        <div className="bio-row">
          <span>Clearance</span>
          <strong>Tier 4</strong>
        </div>
        <div className="bio-row">
          <span>Sector</span>
          <strong>Node 7</strong>
        </div>
        <div className="bio-row">
          <span>Shift</span>
          <strong>Night Ops</strong>
        </div>
      </div> */}

      {/* <div className="panel-summary profile-summary">
        <div className="summary-card pulse-card">
          <span>Active Tasks</span>
          <strong>7</strong>
        </div>
        <div className="summary-card">
          <span>System Load</span>
          <strong>68%</strong>
        </div>
        <div className="summary-card">
          <span>Alerts</span>
          <strong>3</strong>
        </div>
      </div> */}

      {/* <div className="profile-actions">
        <button type="button" onClick={onViewProfile}>View Profile</button>
        <button type="button">Audit Log</button>
      </div> */}

      {systemInfo && (
        <div className="dashboard-footer">
          <span>{systemInfo.hostname}</span>
          <span>{systemInfo.ipAddress}</span>
        </div>
      )}
    </aside>
  );
}
