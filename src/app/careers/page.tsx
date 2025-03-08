import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function CareersPage() {
  const openPositions = [
    {
      id: 1,
      title: "Senior Security Engineer",
      department: "Engineering",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      description:
        "We're looking for a Senior Security Engineer to help us build and maintain our quantum-resistant encryption systems. You'll work closely with our cryptography team to ensure the highest level of security for our users' financial data.",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Remote (US)",
      type: "Full-time",
      description:
        "Join our engineering team to build and improve our web and mobile applications. You'll work on everything from user interfaces to API integrations, helping create seamless experiences for our users.",
    },
    {
      id: 3,
      title: "Data Scientist",
      department: "Analytics",
      location: "New York, NY (Hybrid)",
      type: "Full-time",
      description:
        "Help us build the next generation of AI-powered financial insights. You'll work with large datasets to develop models that provide personalized recommendations and detect patterns in financial behavior.",
    },
    {
      id: 4,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      description:
        "Lead the development of new features and products that help our users manage their financial data securely and gain valuable insights. You'll work closely with engineering, design, and marketing teams.",
    },
    {
      id: 5,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote (US)",
      type: "Full-time",
      description:
        "Create intuitive and beautiful interfaces for our web and mobile applications. You'll be responsible for the entire design process, from user research to final implementation.",
    },
    {
      id: 6,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote (US)",
      type: "Full-time",
      description:
        "Help our enterprise customers get the most out of Lynop. You'll be their main point of contact, providing training, support, and strategic guidance to ensure their success.",
    },
  ];

  const benefits = [
    "Competitive salary and equity",
    "Comprehensive health, dental, and vision insurance",
    "Unlimited PTO policy",
    "401(k) matching",
    "Home office stipend",
    "Professional development budget",
    "Flexible work arrangements",
    "Wellness programs",
    "Parental leave",
    "Regular team retreats",
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 md:py-28 bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Join Our Team
                </h1>
                <p className="mx-auto max-w-[700px] text-blue-100 md:text-xl">
                  Help us build the future of secure financial data management
                  and analytics.
                </p>
              </div>
              <Button size="lg" className="mt-6">
                View Open Positions
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                Why Work at Lynop
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                We're building technology that's changing how people and
                businesses manage their financial data. Join us on this mission
                and work with a team of passionate, talented individuals.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center p-6 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    <path d="M5 3v4" />
                    <path d="M19 17v4" />
                    <path d="M3 5h4" />
                    <path d="M17 19h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Meaningful Impact</h3>
                <p className="text-muted-foreground">
                  Your work will directly impact how people and businesses
                  manage and secure their financial data.
                </p>
              </div>

              <div className="text-center p-6 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Cutting-Edge Tech</h3>
                <p className="text-muted-foreground">
                  Work with quantum-resistant encryption, AI, and other advanced
                  technologies that are shaping the future.
                </p>
              </div>

              <div className="text-center p-6 border rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Exceptional Team</h3>
                <p className="text-muted-foreground">
                  Collaborate with talented, passionate people who are experts
                  in their fields and committed to our mission.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-10">
              Open Positions
            </h2>

            <div className="grid gap-6">
              {openPositions.map((position) => (
                <Card key={position.id}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">
                          {position.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {position.department}
                          </span>
                          <span className="text-sm bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                            {position.location}
                          </span>
                          <span className="text-sm bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                            {position.type}
                          </span>
                        </div>
                      </div>
                      <Button>Apply Now</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {position.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-6">
                  Benefits & Perks
                </h2>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary flex-shrink-0"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                        <path d="m9 11 3 3L22 4" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-muted p-8 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Our Hiring Process</h3>
                <ol className="space-y-6">
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold">Application Review</h4>
                      <p className="text-muted-foreground">
                        Our team reviews your application and resume to assess
                        your qualifications and experience.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold">Initial Interview</h4>
                      <p className="text-muted-foreground">
                        A 30-45 minute video call with a hiring manager to
                        discuss your background and the role.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold">Technical Assessment</h4>
                      <p className="text-muted-foreground">
                        Depending on the role, you may complete a take-home
                        assignment or technical interview.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold">Team Interviews</h4>
                      <p className="text-muted-foreground">
                        Meet with several team members to discuss your skills,
                        experience, and fit with our culture.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      5
                    </div>
                    <div>
                      <h4 className="font-bold">Offer</h4>
                      <p className="text-muted-foreground">
                        If there's a mutual fit, we'll extend an offer and
                        welcome you to the team!
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Don't see the right position?
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground mb-8">
              We're always looking for talented individuals to join our team.
              Send us your resume and we'll keep you in mind for future
              opportunities.
            </p>
            <Button size="lg">Send Your Resume</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
