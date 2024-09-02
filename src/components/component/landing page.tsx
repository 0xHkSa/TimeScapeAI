import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Landingpage() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link
          href="#"
          className="flex items-center justify-center"
          prefetch={false}
        >
          <CameraIcon className="h-6 w-6" />
          <span className="sr-only">TimeScape AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Gallery
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 sm:py-24 md:py-32 lg:py-40 xl:py-48 bg-gradient-to-r from-[#6F2DA8] to-[#9370DB]">
          <div className="container px-4 md:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
                Unlock the Past with TimeScape AI
              </h1>
              <p className="text-lg text-white/80 md:text-xl">
                Capture a photo and let our AI transform it into a stunning
                visual representation of the past.
              </p>
              <Button size="lg" className="px-8 py-3 rounded-full">
                Upload Photo
              </Button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 sm:py-24 md:py-32 lg:py-40 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/placeholder.svg"
                  width={600}
                  height={400}
                  alt="TimeScape AI Sample"
                  className="w-full h-64 object-cover"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Ancient Rome</h3>
                  <p className="text-muted-foreground">
                    Discover the grandeur of ancient Rome through our AI-powered
                    transformation.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/placeholder.svg"
                  width={600}
                  height={400}
                  alt="TimeScape AI Sample"
                  className="w-full h-64 object-cover"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Medieval Europe</h3>
                  <p className="text-muted-foreground">
                    Step back in time and explore the rich history of medieval
                    Europe.
                  </p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src="/placeholder.svg"
                  width={600}
                  height={400}
                  alt="TimeScape AI Sample"
                  className="w-full h-64 object-cover"
                  style={{ aspectRatio: "600/400", objectFit: "cover" }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Ancient Egypt</h3>
                  <p className="text-muted-foreground">
                    Uncover the mysteries of ancient Egypt through our
                    AI-powered transformation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 sm:py-24 md:py-32 lg:py-40 xl:py-48 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Unlock the Past with TimeScape AI
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  TimeScape AI is a revolutionary application that allows you to
                  capture a photo and transform it into a stunning visual
                  representation of the past. Our advanced AI technology
                  analyzes the image and reconstructs the scene based on
                  historical data, bringing the past to life in vivid detail.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Capabilities
                </div>
                <ul className="grid gap-4 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="text-lg font-medium">
                        Historical Accuracy
                      </h3>
                      <p>
                        Our AI-powered technology ensures historical accuracy in
                        the reconstructed scenes, transporting you back in time.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="text-lg font-medium">Stunning Visuals</h3>
                      <p>
                        Experience the past in vivid detail with our
                        high-quality, visually stunning transformations.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <CircleCheckIcon className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <h3 className="text-lg font-medium">
                        Intuitive Interface
                      </h3>
                      <p>
                        Our user-friendly interface makes it easy to capture,
                        transform, and explore the past.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; 2024 TimeScape AI. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-xs hover:underline underline-offset-4"
            prefetch={false}
          >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function CameraIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function CircleCheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
