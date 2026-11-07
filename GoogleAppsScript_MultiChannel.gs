// ============================================================
// SPORTSMAX ANALYTICS & MULTI-CHANNEL ENTERPRISE HUB
// COMPLETE UNIFIED APPS SCRIPT WITH DEDICATED AUTH & LOGS
// ============================================================

// ============================================================
// CONFIGURATION
// ============================================================

const CONFIG = {
  // Spreadsheet ID
  SPREADSHEET_ID: "1fVDwqZtlPZic1HuNWQ7Hgrud0RiP_pa694cY5nLA20s",

  // Admin notification email
  ADMIN_EMAIL: "sreevarthini2006@gmail.com",

  // ==========================================================
  // JIRA
  // ==========================================================
  JIRA: {
    WEBHOOK_URL:
      "https://api-private.atlassian.com/automation/webhooks/jira/a/34f6628f-15f0-42bf-8fb6-041f1541ea73/01a0d934-70ba-7ead-8bb1-3c117126c439",
    WEBHOOK_SECRET: "0606e521750215afe9e1ed8c02b8c624b0c82453"
  },

  // ==========================================================
  // SHEETS
  // ==========================================================
  SHEETS: {
    // Dedicated Authentication Sheets
    REGISTERED_USERS: "Registered_Users",
    LOGIN_LOGS: "Login_Logs",
    USER_CONFIG: "Sports_User_Config",
    SCHOOL_CONFIG: "Schools_User_Config",
    VIDEO_UPLOADS: "PWA_Video_Uploads",
    PHYSICAL_CONFIG: "PWA_Physical_Config",

    // Analytics & Telemetry Sheets
    MASTER: "Live_Traffic_Events",
    PAGE_VIEWS: "Page_Views",
    CTA_CLICKS: "CTA_Clicks",
    SESSIONS: "Sessions",
    USER_BEHAVIOR: "User_Behavior",
    CONTACT_LEADS: "Contact_Leads",
    RUN_ANALYTICS: "Run_Analytics_Events",
    DASHBOARD: "Dashboard_Events",
    INSIGHTS: "Insights_Events",
    RECOMMENDATIONS: "Recommendations_Events",
    UTM: "UTM_Data",
    ANALYTICS: "PROCESSED_ANALYTICS",
    DIGITAL_INTELLIGENCE: "Digital_Intelligence_Events",
    YOUTUBE_ENGAGEMENT: "YouTube Engagement",
    LINKEDIN_ENGAGEMENT: "LinkedIn Engagement"
  }
};

// ============================================================
// SHEET HEADERS
// ============================================================

const HEADERS = {
  // ==========================================================
  // DEDICATED AUTH TAB: REGISTERED USERS (HASHED PASSWORDS)
  // ==========================================================
  Registered_Users: [
    "User ID",
    "Full Name",
    "Email Address",
    "Password Hash (SHA-256)",
    "Salt",
    "Phone Number",
    "Role",
    "Institution Type",
    "Organization / Team",
    "Primary Sport",
    "Athlete Count / Squad Size",
    "Country / Region",
    "Referral Source",
    "Account Status",
    "User Agent",
    "Registration Date & Time"
  ],

  // ==========================================================
  // DEDICATED AUTH TAB: LOGIN LOGS & AUDIT TRAIL
  // ==========================================================
  Login_Logs: [
    "Log ID",
    "User ID",
    "Full Name",
    "Email Address",
    "Role",
    "Organization",
    "Login Status",
    "IP / Location Info",
    "User Agent / Device",
    "Referrer Page",
    "Timestamp"
  ],

  // ==========================================================
  // DEDICATED SPORTS USER CONFIG FORM (MULTI-TAB PREFERENCES)
  // ==========================================================
  Sports_User_Config: [
    "User ID",
    "Email Address",
    "Full Name",
    "Phone Number",
    "Role",
    "Title / Designation",
    "Country / Region",
    "Timezone",
    "Organization / Team",
    "Institution Type",
    "Primary Sport",
    "Secondary Sport",
    "Squad Size",
    "Competition Tier",
    "Season Phase",
    "Pitch Tracking System",
    "Camera Setup",
    "ACWR Corridor",
    "Valgus Risk Threshold",
    "GCT Asymmetry Tolerance",
    "Max Speed Zone",
    "High Metabolic Distance",
    "Preferred Units",
    "Connected Wearables",
    "Email Alerts",
    "SMS Alerts",
    "Halftime Auto Report",
    "Injury Risk Sensitivity",
    "Webhook URL",
    "Last Updated"
  ],

  // ==========================================================
  // DEDICATED SCHOOLS USER CONFIG PAGE (MULTI-TAB ACADEMIC PE)
  // ==========================================================
  Schools_User_Config: [
    "User ID",
    "Email Address",
    "School / Academy Name",
    "Board Affiliation",
    "School Code",
    "Principal Name",
    "PE Director Name",
    "Official Email",
    "Contact Phone",
    "City",
    "State / Region",
    "Grade Bands",
    "Total Student Athletes",
    "Primary Sports Curriculum",
    "Session Frequency",
    "Inter-School Participation",
    "Annual Sports Meet Month",
    "Facilities Available",
    "Fitness Standard",
    "Beep Test Passing Target",
    "50m Sprint Benchmark",
    "Sit & Reach Benchmark",
    "BMI Alerts Active",
    "Posture Screening Active",
    "Heat Index Limit",
    "Auto Report Card PDF",
    "Parent WhatsApp Sync",
    "Parent Email Dispatch",
    "Report Frequency",
    "Growth Tracking",
    "Last Updated"
  ],

  // ==========================================================
  // PWA MOBILE APP: VIDEO UPLOADS & POSE ESTIMATION LOGS
  // ==========================================================
  PWA_Video_Uploads: [
    "Upload ID",
    "User ID",
    "Athlete / Coach Name",
    "Email Address",
    "Role",
    "Sport",
    "Drill / Session Type",
    "File Name",
    "File Size (MB)",
    "Video Duration (sec)",
    "FPS / Resolution",
    "Camera Angle",
    "Biomechanical Goal",
    "Upload Source (PWA / Web)",
    "Processing Status",
    "AI Vision Job ID",
    "Estimated Valgus Moment",
    "Keyframes Extracted",
    "Timestamp"
  ],

  // ==========================================================
  // PWA MOBILE APP: ATHLETE BASIC PHYSICAL CONFIGURATION
  // ==========================================================
  PWA_Physical_Config: [
    "Athlete ID",
    "Athlete Name",
    "Email Address",
    "Sport",
    "Position / Event",
    "Age (Years)",
    "Gender",
    "Height",
    "Weight",
    "BMI",
    "Wingspan",
    "Limb Dominance",
    "Body Fat %",
    "Resting Heart Rate",
    "Max Heart Rate",
    "Vertical Jump Baseline",
    "10m Sprint Baseline",
    "40m Sprint Baseline",
    "1RM Squat Baseline",
    "VO2 Max",
    "Asymmetry Watch Limb",
    "Max Daily Workload Threshold",
    "Medical Clearance Status",
    "Previous Injuries / Notes",
    "Platform Source",
    "Last Updated"
  ],

  // ==========================================================
  // MASTER TELEMETRY
  // ==========================================================
  Live_Traffic_Events: [
    "Timestamp",
    "Event",
    "Page",
    "Visitor ID",
    "Session ID",
    "Name",
    "Email",
    "Role",
    "Organization",
    "Details",
    "Device",
    "Source",
    "Duration",
    "Scroll Depth",
    "CTA Name"
  ],

  // ==========================================================
  // PAGE VIEWS
  // ==========================================================
  Page_Views: [
    "Timestamp",
    "Page",
    "Visitor ID",
    "Session ID",
    "Device",
    "Source"
  ],

  // ==========================================================
  // CTA CLICKS
  // ==========================================================
  CTA_Clicks: [
    "Timestamp",
    "Page",
    "CTA Name",
    "Visitor ID",
    "Session ID",
    "Device",
    "Source",
    "Details"
  ],

  // ==========================================================
  // SESSIONS
  // ==========================================================
  Sessions: [
    "First Seen",
    "Last Seen",
    "Session ID",
    "Visitor ID",
    "Entry Page",
    "Last Page",
    "Device",
    "Source",
    "Event Count"
  ],

  // ==========================================================
  // USER BEHAVIOR
  // ==========================================================
  User_Behavior: [
    "Timestamp",
    "Event",
    "Page",
    "Visitor ID",
    "Session ID",
    "Duration",
    "Scroll Depth",
    "Details",
    "Device"
  ],

  // ==========================================================
  // CONTACT LEADS
  // ==========================================================
  Contact_Leads: [
    "Timestamp",
    "Lead Number",
    "Name",
    "Email",
    "Role",
    "Organization",
    "Details",
    "Page",
    "Visitor ID",
    "Session ID"
  ],

  // ==========================================================
  // RUN ANALYTICS
  // ==========================================================
  Run_Analytics_Events: [
    "Timestamp",
    "Event",
    "Page",
    "Visitor ID",
    "Session ID",
    "Device",
    "Source",
    "Details",
    "CTA Name"
  ],

  // ==========================================================
  // DASHBOARD
  // ==========================================================
  Dashboard_Events: [
    "Timestamp",
    "Event",
    "Page",
    "Visitor ID",
    "Session ID",
    "Device",
    "Source",
    "Details",
    "CTA Name"
  ],

  // ==========================================================
  // INSIGHTS
  // ==========================================================
  Insights_Events: [
    "Timestamp",
    "Event",
    "Page",
    "Visitor ID",
    "Session ID",
    "Device",
    "Source",
    "Details",
    "CTA Name"
  ],

  // ==========================================================
  // RECOMMENDATIONS
  // ==========================================================
  Recommendations_Events: [
    "Timestamp",
    "Event",
    "Page",
    "Visitor ID",
    "Session ID",
    "Device",
    "Source",
    "Details",
    "CTA Name"
  ],

  // ==========================================================
  // UTM DATA
  // ==========================================================
  UTM_Data: [
    "Timestamp",
    "Source",
    "Page",
    "Visitor ID",
    "Session ID",
    "Device",
    "Referrer"
  ],

  // ==========================================================
  // PROCESSED ANALYTICS
  // ==========================================================
  PROCESSED_ANALYTICS: [
    "Metric",
    "Value",
    "Last Updated"
  ],

  // ==========================================================
  // DIGITAL INTELLIGENCE
  // ==========================================================
  Digital_Intelligence_Events: [
    "Timestamp",
    "Visitor ID",
    "Session ID",
    "Event",
    "Page",
    "Entry Page",
    "Exit Page",
    "Navigation Path",
    "Referrer",
    "Traffic Source",
    "Traffic Medium",
    "Campaign",
    "UTM Term",
    "UTM Content",
    "Country",
    "Region",
    "City",
    "Time Zone",
    "Local Hour",
    "IP Hash",
    "ISP / Organization",
    "ASN",
    "Network Type",
    "Device",
    "Browser",
    "Screen Size",
    "Dwell Time (s)",
    "Scroll Depth (%)",
    "Is Repeat Visitor",
    "Visit Count"
  ],

  // ==========================================================
  // YOUTUBE ENGAGEMENT
  // ==========================================================
  "YouTube Engagement": [
    "Comment ID",
    "Video ID",
    "Video Title",
    "Total Views",
    "Total Likes",
    "Total Comments",
    "Comment Text",
    "Commenter Name",
    "Commenter Channel ID",
    "Comment Likes",
    "Comment Date",
    "Comment URL",
    "Last Synced Time"
  ],

  // ==========================================================
  // LINKEDIN ENGAGEMENT
  // ==========================================================
  "LinkedIn Engagement": [
    "Post Title / Topic",
    "Post URL",
    "Total Post Likes",
    "Total Impressions",
    "Commenter Name",
    "Commenter LinkedIn Profile URL / User ID",
    "Comment Text",
    "Comment Likes",
    "Comment Date",
    "Sync Timestamp"
  ]
};

// ============================================================
// SETUP ALL SHEETS AUTOMATICALLY
// ============================================================

function getSpreadsheet() {
  try {
    return SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  } catch (e) {
    return SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  }
}

function setupSportsMaxMultiSheet() {
  const ss = getSpreadsheet();

  Object.keys(CONFIG.SHEETS).forEach(function (key) {
    const sheetName = CONFIG.SHEETS[key];
    let sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    const headers = HEADERS[sheetName];
    if (!headers || !headers.length) return;

    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }
  });

  SpreadsheetApp.flush();
  Logger.log("SportsMax multi-sheet setup completed successfully.");
}

// ============================================================
// MAIN WEB APP POST DISPATCHER
// ============================================================

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return response({ success: false, message: "No POST data received." });
    }

    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return response({ success: false, message: "Invalid JSON: " + parseError.toString() });
    }

    const ss = getSpreadsheet();
    const action = String(data.action || "").trim();
    const event = String(data.event || "").trim().toLowerCase();

    // =========================================================================
    // 1. DEDICATED REGISTRATION HANDLER (PASSWORDS STORED IN HASHED FORMAT)
    // =========================================================================
    if (action === "user_registered" || event === "user_registered") {
      const regSheet = getOrCreateSheet(
        ss,
        CONFIG.SHEETS.REGISTERED_USERS,
        HEADERS.Registered_Users
      );

      const userId = data.userId || data.id || "usr_" + Utilities.getUuid().substring(0, 8);
      const timestamp = data.timestamp || new Date().toISOString();

      regSheet.appendRow([
        userId,
        data.name || "",
        data.email || "",
        data.passwordHash || data.hash || "HASHED_SECURE",
        data.salt || "",
        data.phone || "",
        data.role || "Performance Athlete",
        data.institutionType || "",
        data.organization || "",
        data.primarySport || "",
        data.athleteCount || "",
        data.country || "",
        data.referralSource || "",
        data.status || "ACTIVE",
        data.userAgent || "",
        timestamp
      ]);

      SpreadsheetApp.flush();

      return response({
        success: true,
        action: "user_registered",
        sheet: CONFIG.SHEETS.REGISTERED_USERS,
        userId: userId,
        message: "User registration recorded with hashed credentials."
      });
    }

    // =========================================================================
    // 2. DEDICATED LOGIN & AUDIT LOG HANDLER
    // =========================================================================
    if (action === "user_login" || event === "user_login") {
      const logSheet = getOrCreateSheet(
        ss,
        CONFIG.SHEETS.LOGIN_LOGS,
        HEADERS.Login_Logs
      );

      const logId = "log_" + Utilities.getUuid().substring(0, 8);
      const timestamp = data.timestamp || new Date().toISOString();

      logSheet.appendRow([
        logId,
        data.userId || "",
        data.name || "",
        data.email || "",
        data.role || "",
        data.organization || "",
        data.status || "SUCCESS",
        data.ipInfo || "Direct Client",
        data.userAgent || "",
        data.referrer || "",
        timestamp
      ]);

      SpreadsheetApp.flush();

      return response({
        success: true,
        action: "user_login",
        sheet: CONFIG.SHEETS.LOGIN_LOGS,
        logId: logId,
        message: "Login event logged successfully."
      });
    }

    // =========================================================================
    // 2B. SPORTS USER CONFIG FORM (MULTI-TAB) PERSISTENCE
    // =========================================================================
    if (action === "save_user_config") {
      const configSheet = getOrCreateSheet(
        ss,
        CONFIG.SHEETS.USER_CONFIG,
        HEADERS.Sports_User_Config
      );

      const cfg = data.config || {};
      const queryUserId = String(cfg.userId || "").trim();
      const queryEmail = String(cfg.userEmail || "").trim().toLowerCase();
      const timestamp = cfg.updatedAt || new Date().toISOString();

      const newRow = [
        queryUserId,
        cfg.userEmail || "",
        cfg.fullName || "",
        cfg.phone || "",
        cfg.role || "",
        cfg.title || "",
        cfg.country || "",
        cfg.timezone || "",
        cfg.organizationName || "",
        cfg.institutionType || "",
        cfg.primarySport || "",
        cfg.secondarySport || "",
        cfg.squadSize || "",
        cfg.competitionTier || "",
        cfg.seasonPhase || "",
        cfg.pitchTrackingSystem || "",
        cfg.cameraSetup || "",
        cfg.acwrCorridor || "0.8 - 1.3",
        cfg.valgusRiskThreshold || "2.5 Nm/kg",
        cfg.gctAsymmetryTolerance || "8%",
        cfg.maxSpeedZone || "25.2 km/h",
        cfg.highMetabolicDistanceThreshold || "450 m",
        cfg.preferredUnits || "metric",
        cfg.connectedWearables || "",
        cfg.alertEmail || "Yes",
        cfg.alertSms || "No",
        cfg.halftimeAutoReport || "Enabled",
        cfg.injuryRiskAlertLevel || "MEDIUM",
        cfg.webhookUrl || "None",
        timestamp
      ];

      // Check if user already exists to update row instead of duplicating
      let updated = false;
      const lastRow = configSheet.getLastRow();
      if (lastRow > 1) {
        const userIds = configSheet.getRange(2, 1, lastRow - 1, 2).getValues();
        for (let r = 0; r < userIds.length; r++) {
          const rowId = String(userIds[r][0] || "").trim();
          const rowEmail = String(userIds[r][1] || "").trim().toLowerCase();
          if ((queryUserId && rowId === queryUserId) || (queryEmail && rowEmail === queryEmail)) {
            configSheet.getRange(r + 2, 1, 1, newRow.length).setValues([newRow]);
            updated = true;
            break;
          }
        }
      }

      if (!updated) {
        configSheet.appendRow(newRow);
      }

      SpreadsheetApp.flush();

      return response({
        success: true,
        action: "save_user_config",
        sheet: CONFIG.SHEETS.USER_CONFIG,
        updated: updated,
        message: updated
          ? "Sports user configuration updated successfully."
          : "Sports user configuration created successfully."
      });
    }

    // =========================================================================
    // 2C. SCHOOLS USER CONFIG PAGE (MULTI-TAB ACADEMIC PE) PERSISTENCE
    // =========================================================================
    if (action === "save_school_config") {
      const schoolSheet = getOrCreateSheet(
        ss,
        CONFIG.SHEETS.SCHOOL_CONFIG,
        HEADERS.Schools_User_Config
      );

      const cfg = data.config || {};
      const queryUserId = String(cfg.userId || "").trim();
      const queryEmail = String(cfg.userEmail || "").trim().toLowerCase();
      const timestamp = cfg.updatedAt || new Date().toISOString();

      const newRow = [
        queryUserId,
        cfg.userEmail || "",
        cfg.schoolName || "",
        cfg.boardAffiliation || "",
        cfg.schoolCode || "",
        cfg.principalName || "",
        cfg.peDirectorName || "",
        cfg.officialEmail || "",
        cfg.phone || "",
        cfg.city || "",
        cfg.stateRegion || "",
        cfg.gradeBands || "",
        cfg.totalStudentAthletes || "",
        cfg.primarySports || "",
        cfg.sessionFrequency || "",
        cfg.interSchoolParticipation || "Yes",
        cfg.annualSportsMeetMonth || "",
        cfg.facilitiesAvailable || "",
        cfg.fitnessStandard || "KHELO_INDIA",
        cfg.beepTestTarget || "7.0 Shuttle Level",
        cfg.sprint50mTarget || "8.4s",
        cfg.sitAndReachTarget || "25.0cm",
        cfg.bmiAlerts || "Active",
        cfg.postureScreening || "Active",
        cfg.heatLimitC || "37.5°C",
        cfg.autoReportCardPdf || "Yes",
        cfg.parentWhatsApp || "Enabled",
        cfg.parentEmail || "Enabled",
        cfg.reportFrequency || "TERMLY",
        cfg.growthTracking || "Included",
        timestamp
      ];

      let updated = false;
      const lastRow = schoolSheet.getLastRow();
      if (lastRow > 1) {
        const userIds = schoolSheet.getRange(2, 1, lastRow - 1, 2).getValues();
        for (let r = 0; r < userIds.length; r++) {
          const rowId = String(userIds[r][0] || "").trim();
          const rowEmail = String(userIds[r][1] || "").trim().toLowerCase();
          if ((queryUserId && rowId === queryUserId) || (queryEmail && rowEmail === queryEmail)) {
            schoolSheet.getRange(r + 2, 1, 1, newRow.length).setValues([newRow]);
            updated = true;
            break;
          }
        }
      }

      if (!updated) {
        schoolSheet.appendRow(newRow);
      }

      SpreadsheetApp.flush();

      return response({
        success: true,
        action: "save_school_config",
        sheet: CONFIG.SHEETS.SCHOOL_CONFIG,
        updated: updated,
        message: updated
          ? "Schools user configuration updated successfully."
          : "Schools user configuration created successfully."
      });
    }

    // =========================================================================
    // 2D. PWA MOBILE APP: VIDEO UPLOAD TELEMETRY LOGGING
    // =========================================================================
    if (action === "log_video_upload") {
      const videoSheet = getOrCreateSheet(
        ss,
        CONFIG.SHEETS.VIDEO_UPLOADS,
        HEADERS.PWA_Video_Uploads
      );

      const v = data.video || {};
      const uploadId = v.uploadId || "vid_" + Utilities.getUuid().substring(0, 10);
      const timestamp = v.timestamp || new Date().toISOString();

      const newRow = [
        uploadId,
        v.userId || "anonymous",
        v.userName || "Athlete User",
        v.email || "",
        v.role || "Athlete",
        v.sport || "General Athletic",
        v.drillType || "Biomechanical Movement Analysis",
        v.fileName || "capture.mp4",
        v.fileSizeMb || 0,
        v.durationSeconds || 0,
        v.resolution || "1080p 60fps",
        v.cameraAngle || "Sagittal (Side View)",
        v.biomechanicalGoal || "Joint Angle & Kinematic Tracking",
        v.source || "PWA Mobile App",
        v.status || "PROCESSED_SUCCESS",
        v.aiJobId || "job_" + Utilities.getUuid().substring(0, 8),
        v.valgusMoment || "Normal (Corridor Safe)",
        v.keyframesExtracted || 120,
        timestamp
      ];

      videoSheet.appendRow(newRow);
      SpreadsheetApp.flush();

      return response({
        success: true,
        action: "log_video_upload",
        sheet: CONFIG.SHEETS.VIDEO_UPLOADS,
        uploadId: uploadId,
        message: "PWA Video Upload logged to Google Sheets successfully."
      });
    }

    // =========================================================================
    // 2E. PWA MOBILE APP: ATHLETE BASIC PHYSICAL CONFIGURATION
    // =========================================================================
    if (action === "save_physical_config") {
      const physicalSheet = getOrCreateSheet(
        ss,
        CONFIG.SHEETS.PHYSICAL_CONFIG,
        HEADERS.PWA_Physical_Config
      );

      const p = data.physical || {};
      const athleteId = String(p.athleteId || "").trim();
      const email = String(p.email || "").trim().toLowerCase();
      const timestamp = p.updatedAt || new Date().toISOString();

      const newRow = [
        athleteId,
        p.athleteName || "Athlete",
        p.email || "",
        p.sport || "General Athletic",
        p.positionOrEvent || "All-Round",
        p.ageYears || 20,
        p.gender || "MALE",
        p.heightCm || "",
        p.weightKg || "",
        p.bmi || "",
        p.wingspanCm || "",
        p.limbDominance || "RIGHT",
        p.bodyFatPercent || "",
        p.restingHeartRate || "",
        p.maxHeartRate || "",
        p.verticalJump || "",
        p.sprint10m || "",
        p.sprint40m || "",
        p.oneRepMaxSquat || "",
        p.vo2Max || "",
        p.asymmetryWatchLimb || "NONE",
        p.maxDailyWorkloadThreshold || "",
        p.medicalClearanceStatus || "CLEARED_FULL",
        p.previousInjuries || "None",
        p.source || "SportsMax Mobile PWA",
        timestamp
      ];

      let updated = false;
      const lastRow = physicalSheet.getLastRow();
      if (lastRow > 1) {
        const ids = physicalSheet.getRange(2, 1, lastRow - 1, 2).getValues();
        for (let r = 0; r < ids.length; r++) {
          const rowId = String(ids[r][0] || "").trim();
          const rowEmail = String(ids[r][1] || "").trim().toLowerCase();
          if ((athleteId && rowId === athleteId) || (email && rowEmail === email)) {
            physicalSheet.getRange(r + 2, 1, 1, newRow.length).setValues([newRow]);
            updated = true;
            break;
          }
        }
      }

      if (!updated) {
        physicalSheet.appendRow(newRow);
      }

      SpreadsheetApp.flush();

      return response({
        success: true,
        action: "save_physical_config",
        sheet: CONFIG.SHEETS.PHYSICAL_CONFIG,
        updated: updated,
        message: updated
          ? "Athlete physical configuration updated in Google Sheets."
          : "Athlete physical configuration created in Google Sheets."
      });
    }

    // =========================================================================
    // 2B. REMOTE USER LOOKUP FOR STRICT LOGIN & CROSS-DEVICE AUTH
    // =========================================================================
    if (action === "find_user") {
      const regSheet = ss.getSheetByName(CONFIG.SHEETS.REGISTERED_USERS);
      const queryEmail = String(data.email || "").trim().toLowerCase();

      if (!regSheet || !queryEmail || regSheet.getLastRow() < 2) {
        return response({
          success: false,
          found: false,
          message: "No user records found in Registered_Users sheet."
        });
      }

      const rows = regSheet.getRange(2, 1, regSheet.getLastRow() - 1, 16).getValues();
      let matchedUser = null;

      for (let i = 0; i < rows.length; i++) {
        const rowEmail = String(rows[i][2] || "").trim().toLowerCase();
        if (rowEmail === queryEmail) {
          matchedUser = {
            id: String(rows[i][0] || ""),
            name: String(rows[i][1] || ""),
            email: String(rows[i][2] || ""),
            passwordHash: String(rows[i][3] || ""),
            salt: String(rows[i][4] || ""),
            phone: String(rows[i][5] || ""),
            role: String(rows[i][6] || ""),
            institutionType: String(rows[i][7] || ""),
            organization: String(rows[i][8] || ""),
            primarySport: String(rows[i][9] || ""),
            athleteCount: String(rows[i][10] || ""),
            country: String(rows[i][11] || ""),
            referralSource: String(rows[i][12] || ""),
            status: String(rows[i][13] || "ACTIVE"),
            createdAt: String(rows[i][15] || "")
          };
          break;
        }
      }

      if (matchedUser) {
        return response({
          success: true,
          found: true,
          user: matchedUser
        });
      }

      return response({
        success: true,
        found: false,
        message: "User not found in Registered_Users sheet."
      });
    }

    // =========================================================================
    // 3. YOUTUBE ENGAGEMENT SYNC
    // =========================================================================
    if (action === "youtube_engagement_sync") {
      const sheetName = CONFIG.SHEETS.YOUTUBE_ENGAGEMENT;
      const headers = HEADERS["YouTube Engagement"];
      let sheet = getOrCreateSheet(ss, sheetName, headers);

      const records = Array.isArray(data.records) ? data.records : [];
      const syncTime = data.syncTimestamp || new Date().toISOString();
      const existingIdToRow = {};
      const lastRow = sheet.getLastRow();

      if (lastRow > 1) {
        const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
        for (let i = 0; i < ids.length; i++) {
          const id = String(ids[i][0] || "").trim();
          if (id) existingIdToRow[id] = i + 2;
        }
      }

      const newRows = [];
      let processed = 0;

      records.forEach(function (rec) {
        const commentId = String(rec.commentId || "").trim();
        if (!commentId) return;

        const rowData = [
          commentId,
          String(rec.videoId || ""),
          String(rec.videoTitle || ""),
          Number(rec.totalViews || 0),
          Number(rec.totalLikes || 0),
          Number(rec.totalComments || 0),
          String(rec.commentText || ""),
          String(rec.commenterDisplayName || rec.commenterName || ""),
          String(rec.commenterChannelId || ""),
          Number(rec.commentLikes || 0),
          String(rec.commentDate || ""),
          String(rec.commentUrl || ""),
          syncTime
        ];

        const existingRowNum = existingIdToRow[commentId];
        if (existingRowNum) {
          sheet.getRange(existingRowNum, 1, 1, headers.length).setValues([rowData]);
        } else {
          const newRowIndex = lastRow + newRows.length + 1;
          existingIdToRow[commentId] = newRowIndex;
          newRows.push(rowData);
        }
        processed++;
      });

      if (newRows.length > 0) {
        sheet.getRange(sheet.getLastRow() + 1, 1, newRows.length, headers.length).setValues(newRows);
      }

      SpreadsheetApp.flush();

      return response({
        success: true,
        action: "youtube_engagement_sync",
        processed: processed,
        message: "YouTube engagement sync completed."
      });
    }

    // =========================================================================
    // 4. LINKEDIN ENGAGEMENT SYNC
    // =========================================================================
    if (action === "linkedin_engagement_sync" || data.type === "linkedin_engagement") {
      const sheet = getOrCreateSheet(
        ss,
        CONFIG.SHEETS.LINKEDIN_ENGAGEMENT,
        HEADERS["LinkedIn Engagement"]
      );

      const items = data.records || [];
      if (items.length > 0) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          sheet.appendRow([
            item.postTitle || data.postTitle || "",
            item.postUrl || data.postUrl || "",
            item.totalLikes || data.likes || 0,
            item.impressions || data.impressions || 0,
            item.commenterName || "Unknown Member",
            item.commenterProfileUrl || item.commenterUserId || "",
            item.commentText || "",
            item.commentLikes || 0,
            item.commentDate || new Date().toISOString(),
            new Date().toISOString()
          ]);
        }
      } else {
        sheet.appendRow([
          data.postTitle || "",
          data.postUrl || "",
          data.likes || data.reactions || 0,
          data.impressions || 0,
          data.commenterName || "Summary Entry",
          data.commenterProfileUrl || data.commenterUserId || "",
          data.commentText || "",
          data.commentLikes || 0,
          data.date || new Date().toISOString(),
          new Date().toISOString()
        ]);
      }

      SpreadsheetApp.flush();

      return response({
        success: true,
        action: "linkedin_engagement_sync",
        sheet: CONFIG.SHEETS.LINKEDIN_ENGAGEMENT
      });
    }

    // =========================================================================
    // 5. STANDARD TELEMETRY & BEHAVIOR EVENTS
    // =========================================================================
    if (!event) {
      return response({ success: false, message: "Missing event field." });
    }

    const row = [
      new Date(),
      event,
      data.page || "",
      data.visitorId || "",
      data.sessionId || "",
      data.name || "",
      data.email || "",
      data.role || "",
      data.organization || "",
      data.details || data.message || "",
      data.device || "",
      data.source || data.trafficSource || "",
      data.duration || data.dwellTime || "",
      data.scrollDepth || "",
      data.ctaName || ""
    ];

    // Master Live Traffic
    const master = getOrCreateSheet(ss, CONFIG.SHEETS.MASTER, HEADERS.Live_Traffic_Events);
    master.appendRow(row);

    // Event specific routing
    if (event === "page_view") writePageView(ss, data);
    if (event === "cta_click") writeCtaClick(ss, data);
    if (event === "run_session") writeRunAnalytics(ss, data);
    if (event === "dashboard_view") writeDashboard(ss, data);
    if (event === "insight_view") writeInsights(ss, data);
    if (event === "recommendation_action") writeRecommendation(ss, data);
    if (event === "digital_intelligence") writeDigitalIntelligenceEvent(ss, data);

    if (event === "contact_submission" || action === "contact_lead") {
      const leadNumber = generateLeadNumber(ss);
      data.leadNumber = leadNumber;
      writeContactLead(ss, data);

      try { sendContactEmail(data); } catch (e) { console.error("Email error: " + e.toString()); }
      try { sendContactToJira(data); } catch (e) { console.error("Jira error: " + e.toString()); }
      try { createAirtableLead(data); } catch (e) { console.error("Airtable error: " + e.toString()); }
    }

    writeUserBehavior(ss, data);
    updateSession(ss, data);
    writeUTMData(ss, data);
    updateProcessedAnalytics();

    SpreadsheetApp.flush();

    return response({
      success: true,
      message: "SportsMax event recorded successfully.",
      event: event,
      visitorId: data.visitorId || "",
      sessionId: data.sessionId || ""
    });

  } catch (error) {
    console.error("doPost ERROR: " + error.toString());
    return response({ success: false, message: error.toString() });
  }
}

// ============================================================
// GET REQUEST
// ============================================================

function doGet(e) {
  try {
    const action = e && e.parameter && e.parameter.action ? e.parameter.action : "";
    const email = e && e.parameter && e.parameter.email ? e.parameter.email : "";

    // Remote lookup via GET (CORS friendly)
    if (action === "find_user" && email) {
      const ss = getSpreadsheet();
      const regSheet = ss.getSheetByName(CONFIG.SHEETS.REGISTERED_USERS);
      const queryEmail = String(email).trim().toLowerCase();

      if (!regSheet || regSheet.getLastRow() < 2) {
        return response({ success: true, found: false });
      }

      const rows = regSheet.getRange(2, 1, regSheet.getLastRow() - 1, 16).getValues();
      for (let i = 0; i < rows.length; i++) {
        if (String(rows[i][2] || "").trim().toLowerCase() === queryEmail) {
          return response({
            success: true,
            found: true,
            user: {
              id: String(rows[i][0] || ""),
              name: String(rows[i][1] || ""),
              email: String(rows[i][2] || ""),
              passwordHash: String(rows[i][3] || ""),
              salt: String(rows[i][4] || ""),
              role: String(rows[i][6] || ""),
              organization: String(rows[i][8] || "")
            }
          });
        }
      }
      return response({ success: true, found: false });
    }

    return response({
      success: true,
      message: "SportsMax Analytics API is running.",
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return response({ success: false, error: err.toString() });
  }
}

// ============================================================
// HELPER EVENT WRITERS
// ============================================================

function writePageView(ss, data) {
  const sheet = getOrCreateSheet(ss, CONFIG.SHEETS.PAGE_VIEWS, HEADERS.Page_Views);
  sheet.appendRow([
    new Date(),
    data.page || "",
    data.visitorId || "",
    data.sessionId || "",
    data.device || "",
    data.source || data.trafficSource || ""
  ]);
}

function writeCtaClick(ss, data) {
  const sheet = getOrCreateSheet(ss, CONFIG.SHEETS.CTA_CLICKS, HEADERS.CTA_Clicks);
  sheet.appendRow([
    new Date(),
    data.page || "",
    data.ctaName || "",
    data.visitorId || "",
    data.sessionId || "",
    data.device || "",
    data.source || data.trafficSource || "",
    data.details || ""
  ]);
}

function writeRunAnalytics(ss, data) {
  const sheet = getOrCreateSheet(ss, CONFIG.SHEETS.RUN_ANALYTICS, HEADERS.Run_Analytics_Events);
  sheet.appendRow([
    new Date(),
    data.event || "",
    data.page || "",
    data.visitorId || "",
    data.sessionId || "",
    data.device || "",
    data.source || data.trafficSource || "",
    data.details || "",
    data.ctaName || ""
  ]);
}

function writeDashboard(ss, data) {
  const sheet = getOrCreateSheet(ss, CONFIG.SHEETS.DASHBOARD, HEADERS.Dashboard_Events);
  sheet.appendRow([
    new Date(),
    data.event || "",
    data.page || "",
    data.visitorId || "",
    data.sessionId || "",
    data.device || "",
    data.source || data.trafficSource || "",
    data.details || "",
    data.ctaName || ""
  ]);
}

function writeInsights(ss, data) {
  const sheet = getOrCreateSheet(ss, CONFIG.SHEETS.INSIGHTS, HEADERS.Insights_Events);
  sheet.appendRow([
    new Date(),
    data.event || "",
    data.page || "",
    data.visitorId || "",
    data.sessionId || "",
    data.device || "",
    data.source || data.trafficSource || "",
    data.details || "",
    data.ctaName || ""
  ]);
}

function writeRecommendation(ss, data) {
  const sheet = getOrCreateSheet(ss, CONFIG.SHEETS.RECOMMENDATIONS, HEADERS.Recommendations_Events);
  sheet.appendRow([
    new Date(),
    data.event || "",
    data.page || "",
    data.visitorId || "",
    data.sessionId || "",
    data.device || "",
    data.source || data.trafficSource || "",
    data.details || "",
    data.ctaName || ""
  ]);
}

function writeContactLead(ss, data) {
  const sheet = getOrCreateSheet(ss, CONFIG.SHEETS.CONTACT_LEADS, HEADERS.Contact_Leads);
  sheet.appendRow([
    new Date(),
    data.leadNumber || "",
    data.name || "",
    data.email || "",
    data.role || "",
    data.organization || "",
    data.details || data.message || "",
    data.page || "",
    data.visitorId || "",
    data.sessionId || ""
  ]);
}

function writeUserBehavior(ss, data) {
  const sheet = getOrCreateSheet(ss, CONFIG.SHEETS.USER_BEHAVIOR, HEADERS.User_Behavior);
  sheet.appendRow([
    new Date(),
    data.event || "",
    data.page || "",
    data.visitorId || "",
    data.sessionId || "",
    data.duration || data.dwellTime || "",
    data.scrollDepth || "",
    data.details || data.message || "",
    data.device || ""
  ]);
}

function updateSession(ss, data) {
  const sessionId = String(data.sessionId || "");
  if (!sessionId) return;

  const sheet = getOrCreateSheet(ss, CONFIG.SHEETS.SESSIONS, HEADERS.Sessions);
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    sheet.appendRow([
      new Date(),
      new Date(),
      sessionId,
      data.visitorId || "",
      data.page || "",
      data.page || "",
      data.device || "",
      data.source || data.trafficSource || "",
      1
    ]);
    return;
  }

  const values = sheet.getRange(2, 1, lastRow - 1, 9).getValues();
  let foundRow = -1;

  for (let i = 0; i < values.length; i++) {
    if (String(values[i][2]) === sessionId) {
      foundRow = i + 2;
      break;
    }
  }

  if (foundRow === -1) {
    sheet.appendRow([
      new Date(),
      new Date(),
      sessionId,
      data.visitorId || "",
      data.page || "",
      data.page || "",
      data.device || "",
      data.source || data.trafficSource || "",
      1
    ]);
    return;
  }

  const currentCount = Number(sheet.getRange(foundRow, 9).getValue()) || 0;
  sheet.getRange(foundRow, 2).setValue(new Date());
  sheet.getRange(foundRow, 6).setValue(data.page || "");
  sheet.getRange(foundRow, 9).setValue(currentCount + 1);
}

function writeUTMData(ss, data) {
  const sheet = getOrCreateSheet(ss, CONFIG.SHEETS.UTM, HEADERS.UTM_Data);
  sheet.appendRow([
    new Date(),
    data.source || data.trafficSource || "direct",
    data.page || "",
    data.visitorId || "",
    data.sessionId || "",
    data.device || "",
    data.referrer || data.source || data.trafficSource || "direct"
  ]);
}

function writeDigitalIntelligenceEvent(ss, data) {
  const sheet = getOrCreateSheet(ss, CONFIG.SHEETS.DIGITAL_INTELLIGENCE, HEADERS.Digital_Intelligence_Events);
  function safe(field) {
    const val = data[field];
    return val === undefined || val === null ? "" : val;
  }

  sheet.appendRow([
    data.timestamp || new Date(),
    safe("visitorId"),
    safe("sessionId"),
    "digital_intelligence",
    safe("page"),
    safe("entryPage"),
    safe("exitPage"),
    safe("navigationPath"),
    safe("referrer"),
    safe("trafficSource"),
    safe("trafficMedium"),
    safe("campaign"),
    safe("utmTerm"),
    safe("utmContent"),
    safe("country"),
    safe("region"),
    safe("city"),
    safe("timezone"),
    safe("localHour"),
    safe("ipHash"),
    safe("isp"),
    safe("asn"),
    safe("networkType"),
    safe("device"),
    safe("browser"),
    safe("screenSize"),
    safe("dwellTime"),
    safe("scrollDepth"),
    safe("isRepeatVisitor"),
    safe("visitCount")
  ]);

  SpreadsheetApp.flush();
}

function updateProcessedAnalytics() {
  const ss = getSpreadsheet();
  const raw = ss.getSheetByName(CONFIG.SHEETS.MASTER);
  const analytics = getOrCreateSheet(ss, CONFIG.SHEETS.ANALYTICS, HEADERS.PROCESSED_ANALYTICS);

  if (!raw) return;
  const lastRow = raw.getLastRow();
  if (lastRow < 2) return;

  const data = raw.getRange(2, 1, lastRow - 1, 15).getValues();
  const visitors = new Set();
  const sessions = new Set();
  const pageCounts = {};
  let pageViews = 0, ctaClicks = 0, contactSubmissions = 0, runSessions = 0;
  let dashboardViews = 0, insightViews = 0, recommendationActions = 0;
  let totalDuration = 0, durationCount = 0;

  data.forEach(function (row) {
    const event = String(row[1] || "").trim().toLowerCase();
    const page = String(row[2] || "");
    const visitor = String(row[3] || "");
    const session = String(row[4] || "");

    if (visitor) visitors.add(visitor);
    if (session) sessions.add(session);

    if (event === "page_view") {
      pageViews++;
      if (page) pageCounts[page] = (pageCounts[page] || 0) + 1;
    }
    if (event === "cta_click") ctaClicks++;
    if (event === "contact_submission") contactSubmissions++;
    if (event === "run_session") runSessions++;
    if (event === "dashboard_view" || page === "/dashboard") dashboardViews++;
    if (event === "insight_view" || page === "/insights") insightViews++;
    if (event === "recommendation_action") recommendationActions++;

    const duration = Number(row[12]);
    if (!isNaN(duration) && duration > 0) {
      totalDuration += duration;
      durationCount++;
    }
  });

  let mostViewedPage = "N/A";
  Object.keys(pageCounts).forEach(function (page) {
    if (mostViewedPage === "N/A" || pageCounts[page] > pageCounts[mostViewedPage]) {
      mostViewedPage = page;
    }
  });

  const averageDuration = durationCount > 0 ? Math.round(totalDuration / durationCount) : 0;
  const metrics = [
    ["Total Visitors", visitors.size],
    ["Total Sessions", sessions.size],
    ["Total Page Views", pageViews],
    ["CTA Clicks", ctaClicks],
    ["Contact Submissions", contactSubmissions],
    ["Run Analytics Sessions", runSessions],
    ["Dashboard Views", dashboardViews],
    ["Insight Views", insightViews],
    ["Recommendation Actions", recommendationActions],
    ["Average Duration (sec)", averageDuration],
    ["Most Viewed Page", mostViewedPage],
    ["Last Updated", new Date()]
  ];

  analytics.clearContents();
  analytics.getRange(1, 1, 1, 3).setValues([["Metric", "Value", "Last Updated"]]).setFontWeight("bold");
  analytics.getRange(2, 1, metrics.length, 3).setValues(
    metrics.map(function (metric) {
      return [metric[0], metric[1], new Date()];
    })
  );
}

function sendContactEmail(data) {
  const name = data.name || "SportsMax Visitor";
  const email = data.email || "";
  const role = data.role || "";
  const organization = data.organization || "";
  const details = data.details || data.message || "";
  const subject = "SportsMax Contact Form - " + name;

  const body =
    "New SportsMax contact submission\n\n" +
    "Lead Number: " + (data.leadNumber || "") + "\n" +
    "Name: " + name + "\n" +
    "Email: " + email + "\n" +
    "Role: " + role + "\n" +
    "Organization: " + organization + "\n\n" +
    "Message:\n" + details + "\n\n" +
    "Received: " + new Date().toString();

  MailApp.sendEmail({
    to: CONFIG.ADMIN_EMAIL,
    subject: subject,
    body: body,
    replyTo: email || undefined
  });
}

function generateLeadNumber(ss) {
  const sheet = getOrCreateSheet(ss, CONFIG.SHEETS.CONTACT_LEADS, HEADERS.Contact_Leads);
  const lastRow = sheet.getLastRow();
  const today = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd");

  if (lastRow < 2) {
    return "SM-" + today + "-001";
  }

  const leadNumbers = sheet.getRange(2, 2, lastRow - 1, 1).getValues().flat();
  let count = 0;
  leadNumbers.forEach(function (number) {
    if (number && String(number).startsWith("SM-" + today)) count++;
  });

  return "SM-" + today + "-" + String(count + 1).padStart(3, "0");
}

function sendContactToJira(data) {
  try {
    const payload = {
      leadNumber: data.leadNumber || "",
      name: data.name || "Unknown",
      email: data.email || "",
      role: data.role || "",
      organization: data.organization || "",
      details: data.details || data.message || "",
      source: data.source || "contact_form"
    };

    const options = {
      method: "post",
      contentType: "application/json",
      headers: { "X-Automation-Webhook-Token": CONFIG.JIRA.WEBHOOK_SECRET },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const result = UrlFetchApp.fetch(CONFIG.JIRA.WEBHOOK_URL, options);
    console.log("JIRA STATUS: " + result.getResponseCode());
  } catch (error) {
    console.error("Jira automation error: " + error.toString());
  }
}

function createAirtableLead(data) {
  try {
    const props = PropertiesService.getScriptProperties();
    const token = props.getProperty("AIRTABLE_TOKEN");
    const baseId = props.getProperty("AIRTABLE_BASE_ID");
    if (!token || !baseId) return null;

    const url = "https://api.airtable.com/v0/" + baseId + "/Contact%20Leads";
    const payload = {
      fields: {
        "Lead Number": data.leadNumber || "",
        "Name": data.name || "",
        "Email": data.email || "",
        "Role": data.role || "",
        "Organization": data.organization || "",
        "Message": data.details || data.message || "",
        "Source": data.source || "contact_form",
        "Status": "New"
      }
    };

    const result = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      headers: { Authorization: "Bearer " + token },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });

    return JSON.parse(result.getContentText());
  } catch (error) {
    console.error("Airtable lead error: " + error.toString());
    return null;
  }
}

function getOrCreateSheet(ss, sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  if (headers && headers.length && sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function response(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
