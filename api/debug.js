export default async function handler(req, res) {
  const checks = {
    ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
    OPENAI_API_KEY: !!process.env.OPENAI_API_KEY,
    SUPABASE_SERVICE_KEY: !!process.env.SUPABASE_SERVICE_KEY,
    VITE_SUPABASE_URL: !!process.env.VITE_SUPABASE_URL,
    node_version: process.version,
  };
  return res.status(200).json(checks);
}
