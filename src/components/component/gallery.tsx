import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function gallery() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <header className="flex items-center justify-between h-16 px-6 border-b border-muted">
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
            prefetch={false}
          >
            <ImageIcon className="w-6 h-6" />
            <span>AI Image Generator</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
            <Link href="#" className="text-primary" prefetch={false}>
              Gallery
            </Link>
            <Link
              href="#"
              className="text-muted-foreground hover:text-foreground"
              prefetch={false}
            >
              Explore
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <img
              src="/placeholder.svg"
              width={32}
              height={32}
              alt="Avatar"
              className="rounded-full"
              style={{ aspectRatio: "32/32", objectFit: "cover" }}
            />
          </Button>
        </div>
      </header>
      <main className="flex-1 grid gap-6 p-6 md:p-10">
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Your Gallery</h2>
            <Link
              href="#"
              className="text-primary hover:underline"
              prefetch={false}
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
            {[...Array(10)].map((_, i) => (
              <Link
                key={i}
                href="#"
                className="group relative overflow-hidden rounded-lg"
                prefetch={false}
              >
                <img
                  src="/placeholder.svg"
                  alt={`Image ${i + 1}`}
                  width="300"
                  height="300"
                  className="w-full h-full object-cover transition-all group-hover:scale-110"
                  style={{ aspectRatio: "300/300", objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <MaximizeIcon className="w-6 h-6 text-white" />
                </div>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Explore</h2>
            <Link
              href="#"
              className="text-primary hover:underline"
              prefetch={false}
            >
              View all
            </Link>
          </div>
          <div className="grid gap-6 mt-6">
            <div className="flex items-center gap-4 bg-muted rounded-lg p-4">
              <SearchIcon className="w-6 h-6 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for image prompts..."
                className="flex-1 bg-transparent border-0 focus:ring-0"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <Card key={i} className="border-0 shadow-none">
                  <CardContent className="p-0">
                    <img
                      src="/placeholder.svg"
                      alt={`Prompt ${i + 1}`}
                      width="200"
                      height="200"
                      className="w-full h-full object-cover rounded-t-lg"
                      style={{ aspectRatio: "200/200", objectFit: "cover" }}
                    />
                  </CardContent>
                  <CardFooter className="bg-muted text-muted-foreground p-3 rounded-b-lg">
                    <div className="font-medium">Prompt {i + 1}</div>
                    <div className="text-sm">
                      A detailed description of the image prompt.
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ImageIcon(props) {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function MaximizeIcon(props) {
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
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}