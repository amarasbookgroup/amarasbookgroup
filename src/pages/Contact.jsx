import { useSearchParams } from "react-router";

export default function Contact() {
  const [params] = useSearchParams();
  const success = params.get("success") === "true";

  return (
    <section className="container-page section">
      <div className="grid gap-10 lg:grid-cols-[1.2fr,1fr]">
        <div>
          <span className="pill">Contact</span>
          <h1 className="mt-3 font-display text-5xl font-black text-armenian-ink">
            Say parev.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-armenian-ink/80">
            We're a team of one with a great big dream: keeping{" "}
            <strong>Western Armenian</strong> alive and well for the next
            generation. If you have a question, a kind comment, a constructive
            suggestion, or want to offer affordable or free help — please don't
            be shy.
          </p>
          <p className="mt-3 max-w-xl text-armenian-ink/70">
            For sales inquiries, to be added to a book wait list, or anything
            else, send a note below or email us directly.
          </p>

          {success && (
            <div className="mt-6 rounded-2xl border border-armenian-blue/30 bg-armenian-blue/10 p-4 text-armenian-blue">
              Thanks! Your message is on its way. We'll be in touch soon.
            </div>
          )}

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            action="/contact?success=true"
            className="mt-8 grid gap-4"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don't fill this out: <input name="bot-field" />
              </label>
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-bold text-armenian-ink">
                  Your name
                </span>
                <input
                  type="text"
                  name="name"
                  required
                  className="mt-1 w-full rounded-xl border border-armenian-ink/15 bg-white px-4 py-3 outline-none focus:border-armenian-blue"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-armenian-ink">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full rounded-xl border border-armenian-ink/15 bg-white px-4 py-3 outline-none focus:border-armenian-blue"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-bold text-armenian-ink">
                Message
              </span>
              <textarea
                name="message"
                rows={6}
                required
                className="mt-1 w-full rounded-xl border border-armenian-ink/15 bg-white px-4 py-3 outline-none focus:border-armenian-blue"
              />
            </label>

            <div>
              <button type="submit" className="btn-primary">
                Send message
              </button>
            </div>
          </form>
        </div>

        <aside className="space-y-5">
          <div className="card p-6">
            <h2 className="font-display text-xl font-bold">Email us directly</h2>
            <p className="mt-2 text-sm text-armenian-ink/70">
              Prefer email? Reach us at:
            </p>
            <a
              href="mailto:amarasbookgroup@gmail.com"
              className="mt-3 inline-block font-bold text-armenian-blue hover:underline"
            >
              amarasbookgroup@gmail.com
            </a>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-xl font-bold">A team of one</h2>
            <p className="mt-2 text-sm text-armenian-ink/70">
              Amaras Book Group is a one-person passion project working to
              support the revival of the Western Armenian language. Every
              message is read personally — thank you for taking the time to
              reach out.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-xl font-bold">Wait lists & sales</h2>
            <p className="mt-2 text-sm text-armenian-ink/70">
              Interested in upcoming titles, bulk orders for schools, or being
              added to a book wait list? Mention it in your message and we'll
              be in touch.
            </p>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-xl font-bold">Response time</h2>
            <p className="mt-2 text-sm text-armenian-ink/70">
              Since it's just one person behind the scenes, replies usually
              arrive within a few days. Thank you for your patience.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
