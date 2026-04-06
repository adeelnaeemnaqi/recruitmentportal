export default function OnboardingPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header className="space-y-2">
        <p className="text-sm font-medium text-brand-600">Step 1 of 1 · New audit</p>
        <h1 className="text-3xl font-bold">Let’s diagnose the profile before we rewrite it.</h1>
        <p className="text-slate-600">This takes 2–3 minutes. We’ll score, match, and suggest a better positioning strategy.</p>
      </header>

      <form action="/api/audits" method="post" className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Current profile input</h2>
          <textarea name="currentProfileText" required placeholder="Paste your current LinkedIn profile text" className="min-h-40 w-full rounded-lg border p-3" />
          <textarea name="resumeText" placeholder="Optional: paste resume text" className="min-h-28 w-full rounded-lg border p-3" />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Target direction</h2>
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
          <input name="targetLocation" placeholder="Optional target location" className="w-full rounded-lg border p-2" />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Optional job description</h2>
          <textarea name="jobDescriptionText" placeholder="Paste a target job description to unlock job-match scoring" className="min-h-32 w-full rounded-lg border p-3" />
        </section>

        <button className="rounded-lg bg-brand-600 px-5 py-3 font-medium text-white">Run full audit</button>
      </form>
    </div>
  );
}
