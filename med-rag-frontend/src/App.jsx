import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";

const COLORS = {
  bg: "#0f172a", // dark navy
  cardBg: "#020617",
  accent: "#22c55e", // green
  accentSoft: "#bbf7d0",
  accentDanger: "#ef4444",
  accentWarn: "#f59e0b",
  textPrimary: "#e5e7eb",
  textSecondary: "#9ca3af",
  border: "#1f2937",
};

const styles = {
  app: {
    minHeight: "100vh",
    margin: 0,
    padding: "40px 20px",
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    background: "radial-gradient(circle at top, #1d283a 0, #020617 55%, #000 100%)",
    color: COLORS.textPrimary,
    display: "flex",
    justifyContent: "center",
  },
  shell: {
    width: "100%",
    maxWidth: "960px",
  },
  headerCard: {
    background: "linear-gradient(135deg, #16a34a, #22c55e, #38bdf8)",
    borderRadius: "24px",
    padding: "24px 28px",
    marginBottom: "24px",
    color: "#ecfdf5",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 24px 60px rgba(15, 118, 110, 0.35)",
  },
  headerLeft: {
    maxWidth: "70%",
  },
  headerTitle: {
    fontSize: "26px",
    fontWeight: 700,
    margin: 0,
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  headerBadge: {
    fontSize: "11px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    padding: "4px 10px",
    borderRadius: "999px",
    backgroundColor: "rgba(15, 23, 42, 0.18)",
    border: "1px solid rgba(15, 23, 42, 0.35)",
  },
  headerSubtitle: {
    marginTop: "6px",
    fontSize: "14px",
    opacity: 0.9,
  },
  headerRight: {
    textAlign: "right",
    fontSize: "12px",
  },
  statusChip: (color) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    borderRadius: "999px",
    backgroundColor: "rgba(15, 23, 42, 0.45)",
    border: "1px solid rgba(15, 23, 42, 0.35)",
    color,
  }),
  mainGrid: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1.4fr)",
    gap: "20px",
  },
  panel: {
    backgroundColor: COLORS.cardBg,
    borderRadius: "16px",
    border: `1px solid ${COLORS.border}`,
    padding: "18px 18px 20px",
    boxShadow: "0 18px 40px rgba(15,23,42,0.55)",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "12px",
  },
  panelTitle: {
    fontSize: "16px",
    fontWeight: 600,
  },
  panelCaption: {
    fontSize: "12px",
    color: COLORS.textSecondary,
  },
  uploadBox: {
    borderRadius: "14px",
    border: `1px dashed ${COLORS.border}`,
    background: "rgba(15,23,42,0.6)",
    padding: "14px 14px 12px",
    marginBottom: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },
  uploadLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  uploadTitle: {
    fontSize: "14px",
    fontWeight: 500,
  },
  uploadHint: {
    fontSize: "12px",
    color: COLORS.textSecondary,
  },
  hiddenFile: {
    display: "none",
  },
  uploadButton: {
    fontSize: "12px",
    fontWeight: 500,
    padding: "8px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(148, 163, 184, 0.7)",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(15,23,42,0.85))",
    color: COLORS.textPrimary,
    cursor: "pointer",
  },
  inputRow: {
    display: "flex",
    alignItems: "stretch",
    marginBottom: "10px",
    gap: "8px",
  },
  textInput: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: "999px",
    border: `1px solid ${COLORS.border}`,
    backgroundColor: "#020617",
    color: COLORS.textPrimary,
    fontSize: "14px",
    outline: "none",
  },
  askButton: (disabled) => ({
    padding: "0 18px",
    borderRadius: "999px",
    border: "none",
    fontSize: "14px",
    fontWeight: 500,
    cursor: disabled ? "not-allowed" : "pointer",
    background: disabled
      ? "linear-gradient(135deg, #334155, #1f2937)"
      : "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "#f9fafb",
    boxShadow: disabled
      ? "none"
      : "0 14px 30px rgba(34,197,94,0.45)",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
  }),
  helperRow: {
    fontSize: "11px",
    color: COLORS.textSecondary,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    marginTop: "-4px",
  },
  responseBox: {
    marginTop: "8px",
    borderRadius: "14px",
    border: `1px solid ${COLORS.border}`,
    background:
      "radial-gradient(circle at top left, rgba(34,197,94,0.16), rgba(15,23,42,0.9))",
    padding: "14px 16px",
  },
  answerText: {
    fontSize: "14px",
    lineHeight: 1.5,
    color: "#e5e7eb",
  },
  ragBadge: (score) => {
    let bg = COLORS.accentDanger;
    if (score > 0.8) bg = COLORS.accent;
    else if (score > 0.4) bg = COLORS.accentWarn;
    return {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "5px 12px",
      borderRadius: "999px",
      backgroundColor: bg,
      color: "#0f172a",
      fontSize: "12px",
      fontWeight: 600,
      marginTop: "10px",
    };
  },
  ragDot: {
    width: "8px",
    height: "8px",
    borderRadius: "999px",
    backgroundColor: "#0f172a",
  },
  sourcesWrapper: {
    marginTop: "14px",
  },
  sourcesTitle: {
    fontSize: "13px",
    fontWeight: 500,
    marginBottom: "6px",
  },
  sourceCard: {
    marginBottom: "10px",
    borderRadius: "10px",
    border: `1px solid ${COLORS.border}`,
    backgroundColor: "#020617",
    padding: "10px 12px",
  },
  sourceLabel: {
    fontSize: "11px",
    color: COLORS.textSecondary,
    marginBottom: "3px",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  sourceText: {
    fontSize: "13px",
    color: COLORS.textPrimary,
  },
  sideMetrics: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  statCard: {
    borderRadius: "12px",
    border: `1px solid ${COLORS.border}`,
    backgroundColor: "#020617",
    padding: "10px 12px",
  },
  statLabel: {
    fontSize: "11px",
    color: COLORS.textSecondary,
    marginBottom: "3px",
  },
  statValue: {
    fontSize: "16px",
    fontWeight: 600,
  },
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    padding: "4px 8px",
    borderRadius: "999px",
    backgroundColor: "rgba(15,23,42,0.8)",
    border: `1px solid ${COLORS.border}`,
    color: COLORS.textSecondary,
  },
};

function App() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);
      setResponse(null);

      const res = await axios.post(
        `${API_URL}/api/v1/query`,
        null,
        { params: { query: question } }
      );

      setResponse(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching response");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      await axios.post(
        `${API_URL}/api/v1/ingest/pdf`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("PDF uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("PDF upload failed");
    } finally {
      setUploading(false);
    }
  };

  const ragScore = response?.evaluation?.rag_score ?? null;

  return (
    <div style={styles.app}>
      <div style={styles.shell}>
        {/* Header / Hero */}
        <div style={styles.headerCard}>
          <div style={styles.headerLeft}>
            <div style={styles.headerBadge}>Healthcare RAG · Internal Demo</div>
            <h1 style={styles.headerTitle}>
              Medical RAG Assistant
            </h1>
            <p style={styles.headerSubtitle}>
              Ask clinical questions grounded on your uploaded guidelines and PDFs.
              Not for emergency use.
            </p>
          </div>
          <div style={styles.headerRight}>
            <div style={styles.statusChip("#bbf7d0")}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: "#bbf7d0",
                }}
              />
              Online
            </div>
            <div style={{ marginTop: 6, color: "rgba(15,23,42,0.85)" }}>
              {uploading
                ? "Uploading knowledge base…"
                : loading
                  ? "Generating answer…"
                  : "Ready for your question"}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={styles.mainGrid}>
          {/* Left: Chat / Q&A */}
          <div style={styles.panel}>
            <div style={styles.panelHeader}>
              <div style={styles.panelTitle}>Ask a medical question</div>
              <div style={styles.panelCaption}>
                Powered by RAG + LLM (demo only)
              </div>
            </div>

            {/* Upload */}
            <div style={styles.uploadBox}>
              <div style={styles.uploadLeft}>
                <div style={styles.uploadTitle}>Upload clinical PDF</div>
                <div style={styles.uploadHint}>
                  Treatment protocols, guidelines, or FAQs. Used as retrieval context.
                </div>
                {uploading && (
                  <div style={{ fontSize: 11, color: COLORS.accentSoft }}>
                    Uploading PDF…
                  </div>
                )}
              </div>
              <div>
                <label style={styles.uploadButton}>
                  <input
                    type="file"
                    accept="application/pdf"
                    style={styles.hiddenFile}
                    onChange={handleFileUpload}
                  />
                  Choose PDF
                </label>
              </div>
            </div>

            {/* Question input */}
            <div style={styles.inputRow}>
              <input
                type="text"
                placeholder="e.g. What is the first-line treatment for hypertension?"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                style={styles.textInput}
              />
              <button
                onClick={askQuestion}
                disabled={loading || !question.trim()}
                style={styles.askButton(loading || !question.trim())}
              >
                {loading ? "Thinking…" : "Ask"}
              </button>
            </div>

            <div style={styles.helperRow}>
              <span>Do not enter real patient names or identifiers.</span>
              <span>For emergencies, contact a doctor or local emergency number.</span>
            </div>

            {/* Response */}
            {loading && (
              <div style={{ fontSize: 13, color: COLORS.textSecondary }}>
                Generating answer based on retrieved chunks…
              </div>
            )}

            {response && (
              <div style={styles.responseBox}>
                <div style={{ marginBottom: 6 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: COLORS.textSecondary,
                    }}
                  >
                    Answer
                  </span>
                </div>
                <p style={styles.answerText}>{response.answer}</p>

                {ragScore !== null && (
                  <div style={styles.ragBadge(ragScore)}>
                    <div style={styles.ragDot} />
                    <span>RAG score: {ragScore.toFixed(2)}</span>
                  </div>
                )}

                {/* Sources */}
                {response.sources?.length > 0 && (
                  <div style={styles.sourcesWrapper}>
                    <div style={styles.sourcesTitle}>Sources</div>
                    {response.sources.map((src, index) => (
                      <div key={index} style={styles.sourceCard}>
                        <div style={styles.sourceLabel}>
                          Source {index + 1}
                        </div>
                        <div style={styles.sourceText}>
                          {src.content.length > 200
                            ? src.content.substring(0, 200) + "…"
                            : src.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Side metrics / safety */}
          <div className="side" style={styles.sideMetrics}>
            <div style={styles.statCard}>
              <div style={styles.statLabel}>System status</div>
              <div style={styles.statValue}>
                {loading ? "Answering…" : "Healthy"}
              </div>
              <div style={{ marginTop: 6 }}>
                <span style={styles.pill}>
                  • Postgres RAG
                </span>{" "}
                <span style={styles.pill}>
                  • Experimental
                </span>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Intended use</div>
              <div style={{ fontSize: 13, color: COLORS.textPrimary }}>
                Early prototype to explore RAG for clinical knowledge retrieval.
                Not a substitute for professional medical advice.
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statLabel}>Privacy notice</div>
              <div style={{ fontSize: 13, color: COLORS.textSecondary }}>
                Do not use real patient identifiers.
                Use synthetic or anonymised scenarios only.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
