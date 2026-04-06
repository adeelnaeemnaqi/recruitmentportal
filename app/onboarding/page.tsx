export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-2xl font-semibold">Let’s diagnose the profile before we rewrite it.</h1>
        <p className="text-sm text-slate-600">Paste profile details below to generate your first audit.</p>
      </div>
      <form action="/api/audits" method="post" className="grid gap-4">
        <textarea name="currentProfileText" required placeholder="Current LinkedIn profile text" className="min-h-36 rounded-lg border p-3" />
        <textarea name="resumeText" placeholder="Optional resume text" className="min-h-28 rounded-lg border p-3" />
        <div className="grid gap-4 md:grid-cols-2">
          <input name="targetJobTitle" required placeholder="Target job title" className="rounded-lg border p-2" />
          <input name="targetIndustry" required placeholder="Target industry" className="rounded-lg border p-2" />
          <select name="experienceLevel" className="rounded-lg border p-2" defaultValue="MID">
            <option value="ENTRY">Entry</option>
            <option value="MID">Mid</option>
            <option value="SENIOR">Senior</option>
            <option value="EXECUTIVE">Executive</option>
          </select>
          <select name="profileType" className="rounded-lg border p-2" defaultValue="JOB_SEEKER">
            <option value="JOB_SEEKER">Job seeker</option>
            <option value="CAREER_SWITCHER">Career switcher</option>
            <option value="FREELANCER">Freelancer</option>
            <option value="CONSULTANT">Consultant</option>
          </select>
        </div>
        <input name="targetLocation" placeholder="Optional target location" className="rounded-lg border p-2" />
        <textarea name="jobDescriptionText" placeholder="Optional pasted job description" className="min-h-28 rounded-lg border p-3" />
        <button className="rounded-lg bg-brand-600 px-4 py-2 font-medium text-white">Run audit</button>
      </form>
    </div>
  );
}
