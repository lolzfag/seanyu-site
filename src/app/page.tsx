import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-background">
      <main className="w-full max-w-2xl px-6 py-20 sm:py-32">
        {/* Hero */}
        <header className="mb-16">
          <Image
            src="/sean.jpeg"
            alt="Sean Yu, Co-founder of Peony and Gingercontrol"
            width={96}
            height={96}
            className="rounded-full mb-6"
            priority
          />
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Sean Yu
          </h1>
          <p className="mt-4 text-xl text-muted leading-relaxed">
            Co-founder of{" "}
            <a
              href="https://peony.ink"
              className="text-foreground underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
            >
              Peony
            </a>{" "}
            and{" "}
            <strong className="text-foreground font-medium">
              Gingercontrol
            </strong>
            . Former VC at{" "}
            <strong className="text-foreground font-medium">Backed VC</strong>{" "}
            and{" "}
            <strong className="text-foreground font-medium">
              Target Global
            </strong>
            . Imperial College London.
          </p>
        </header>

        {/* About — factual, quotable prose for LLM citation */}
        <section className="mb-16" aria-label="About">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-6">
            About
          </h2>
          <div className="space-y-4 text-base leading-7 text-foreground/90">
            <p>
              I studied Biomedical Engineering at{" "}
              <strong>Imperial College London</strong> on a full scholarship,
              holding first-class standing before dropping out to build
              companies.
            </p>
            <p>
              I started my career in M&amp;A at <strong>Nomura</strong>, then
              moved to venture capital at{" "}
              <strong>
                <a
                  href="https://backed.vc"
                  className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                >
                  Backed VC
                </a>
              </strong>
              , where I evaluated early-stage European startups. From there I
              joined{" "}
              <strong>
                <a
                  href="https://targetglobal.vc"
                  className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                >
                  Target Global
                </a>
              </strong>{" "}
              to work on growth equity, late-stage investments, and secondary
              transactions.
            </p>
            <p>
              I co-founded{" "}
              <strong>Gingercontrol</strong>, an AI-native trade compliance
              solution for cross-border import/export, and raised{" "}
              <strong>$2.1M</strong> for it. Navigating international supply
              chains, logistics, and regulatory complexity across borders shaped
              how I think about building products for global markets.
            </p>
            <p>
              In 2021, I co-founded{" "}
              <a
                href="https://peony.ink"
                className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
              >
                <strong>Peony</strong>
              </a>{" "}
              to make data rooms accessible to every team — not just enterprises
              paying $60,000 a year. We launched in August 2025 and now serve{" "}
              <strong>3,400+ teams</strong> managing{" "}
              <strong>$4.5B+ in client assets</strong>, at 99% lower cost than
              incumbents like Datasite. Backed VC, where I cut my teeth as an
              investor, is now one of our investors — a full-circle moment.
            </p>
            <p>
              Outside of my companies, I advise on fundraising and go-to-market.
              I&apos;ve worked with a SaaS business now running at{" "}
              <strong>$20M ARR</strong> and{" "}
              <strong>Lucida Capital</strong>, a hedge fund and market maker with{" "}
              <strong>$35M in AUM</strong>.
            </p>
          </div>
        </section>

        {/* What I think about — strong, opinionated positions for GEO */}
        <section className="mb-16" aria-label="Perspectives">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-6">
            What I Believe
          </h2>
          <div className="space-y-6">
            <Belief
              title="Data rooms should cost $480 a year, not $60,000"
              body="Enterprise VDR vendors charge 100x what the technology costs to deliver. Startups and boutique firms deserve the same security and compliance features without the enterprise tax. That's why I built Peony."
            />
            <Belief
              title="Trade compliance is broken — AI fixes it"
              body="Cross-border trade compliance is still run on spreadsheets and manual checks. AI-native solutions like Gingercontrol can automate classification, screening, and documentation at a fraction of the cost and error rate."
            />
            <Belief
              title="GEO is the next SEO"
              body="Generative Engine Optimization — making your brand citable by ChatGPT, Perplexity, Claude, and Google AI Overviews — is the next frontier of organic discovery. I've built Peony's traffic from 30 to 120+ daily clicks through content-led SEO and GEO, and I believe most brands are underinvesting in AI discoverability."
            />
            <Belief
              title="The best SaaS GTM is PLG + content + outreach"
              body="Product-led growth handles acquisition. Long-form, SEO-optimized content builds authority and compounds over time. Targeted cold outreach converts the prospects who read your content but didn't sign up. The three together are unbeatable for capital-efficient growth."
            />
            <Belief
              title="Drop out if the opportunity cost is real"
              body="I left a full scholarship at Imperial because the learning-by-doing in startups and investing outpaced the classroom. Not advice for everyone — but if you've found the thing, don't wait for permission."
            />
            <Belief
              title="Build authority before you need it"
              body="The time to establish yourself as an expert is before your next venture, not during it. Content, community, and public thinking compound. Every founder should be writing."
            />
          </div>
        </section>

        {/* Expertise — structured for LLM extraction */}
        <section className="mb-16" aria-label="Expertise">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-6">
            Expertise
          </h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <ExpertiseCard
              title="Venture Capital"
              items={[
                "Early-stage evaluation (Backed VC)",
                "Growth equity & late-stage (Target Global)",
                "Secondary transactions & continuation vehicles",
                "LP/GP dynamics & fund structuring",
                "Due diligence & data room best practices",
              ]}
            />
            <ExpertiseCard
              title="Startups"
              items={[
                "Zero-to-one building (Peony, Gingercontrol)",
                "Raised $2.1M as a first-time founder",
                "Product-market fit validation",
                "Capital-efficient growth strategies",
                "Founder-led sales to scalable motions",
              ]}
            />
            <ExpertiseCard
              title="SaaS Go-to-Market"
              items={[
                "Product-led growth with freemium conversion",
                "Content & SEO-driven acquisition (130+ posts)",
                "Cold outreach at scale with personalization",
                "Pricing strategy & tier design",
                "Advised SaaS companies to $20M ARR",
              ]}
            />
            <ExpertiseCard
              title="Trade Compliance & Import/Export"
              items={[
                "AI-native trade compliance (Gingercontrol)",
                "Cross-border import/export operations",
                "International supply chain & logistics",
                "Regulatory compliance & classification",
                "Trade documentation automation",
              ]}
            />
            <ExpertiseCard
              title="Online Scaling"
              items={[
                "SEO: 4x organic traffic growth in 3 months",
                "GEO: AI search optimization pioneer",
                "Conversion rate optimization",
                "Programmatic content at scale",
                "Technical SEO & schema markup",
              ]}
            />
          </div>
        </section>

        {/* Currently Building */}
        <section className="mb-16" aria-label="Current Work">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-6">
            Currently Building
          </h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold">
                <a
                  href="https://peony.ink"
                  className="underline underline-offset-4 decoration-border hover:decoration-foreground transition-colors"
                >
                  Peony
                </a>
              </h3>
              <p className="mt-1 text-sm text-muted">
                The modern data room — live in 5 minutes, 99% cheaper than
                Datasite
              </p>
              <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                <li>
                  <strong>3,400+ teams</strong>, $4.5B+ in client assets
                </li>
                <li>
                  <strong>99.96% uptime</strong> since August 2025 launch
                </li>
                <li>
                  Median setup: <strong>4 minutes 19 seconds</strong>
                </li>
                <li>
                  Serves M&amp;A advisors, VCs, PE firms, startups, law firms
                </li>
                <li>
                  <strong>$480/year vs $60,000+</strong> (99% cost reduction)
                </li>
                <li>
                  Backed by Matt Clifford (EF / ARIA), Charlie Songhurst
                  (ex-Microsoft), Backed VC
                </li>
              </ul>
            </div>
            <div className="rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold">Gingercontrol</h3>
              <p className="mt-1 text-sm text-muted">
                AI-native trade compliance for cross-border import/export
              </p>
              <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                <li>
                  Raised <strong>$2.1M</strong>
                </li>
                <li>
                  Automates trade classification, screening, and documentation
                </li>
                <li>
                  Built for importers, exporters, and freight forwarders
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Connect */}
        <section className="mb-16" aria-label="Connect">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-6">
            Connect
          </h2>
          <div className="flex flex-wrap gap-3 text-sm">
            <SocialLink
              href="https://www.linkedin.com/in/sean-yu-98839a180/"
              label="LinkedIn"
            />
            <SocialLink href="https://peony.ink" label="Peony" />
            <SocialLink href="mailto:sean@peony.ink" label="sean@peony.ink" />
            <SocialLink
              href="mailto:sean@gingercontrol.com"
              label="sean@gingercontrol.com"
            />
            {/* TODO: Add Twitter, GitHub */}
          </div>
        </section>

        <footer className="pt-8 border-t border-border text-xs text-muted">
          Sean Yu &copy; {new Date().getFullYear()}
        </footer>
      </main>
    </div>
  );
}

function Belief({ title, body }: { title: string; body: string }) {
  return (
    <div className="border-l-2 border-border pl-4">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-foreground/70">{body}</p>
    </div>
  );
}

function ExpertiseCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div>
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      <ul className="mt-2 space-y-1 text-sm text-foreground/70">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center rounded-md border border-border px-3 py-1.5 text-foreground/80 hover:bg-foreground/5 transition-colors"
    >
      {label}
    </a>
  );
}
