import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileImage,
  ImagePlus,
  Mail,
  Menu,
  MessageSquareText,
  Phone,
  Recycle,
  ShieldCheck,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ChangeEvent, DragEvent, FormEvent, useMemo, useState } from "react";

const navItems = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "What We Take", href: "#services" },
  { label: "FAQ", href: "#faq" },
];

const areas = ["Brisbane", "Melbourne"];

const volumeCategories = ["Furniture", "Appliances", "Outdoor", "Office", "Moving boxes", "Renovation waste"];

const volumeItems = [
  ["3 Seater Couch", "1.5m3", "SFA"],
  ["Armchair", "0.6m3", "CHR"],
  ["TV Unit", "0.5m3", "TV"],
  ["Single Bed + Mattress", "1m3", "BED"],
  ["Fridge", "1m3", "FRG"],
  ["Washing Machine", "0.7m3", "WM"],
  ["Microwave", "0.1m3", "MIC"],
  ["Oven", "0.5m3", "OVN"],
  ["Bicycle", "0.3m3", "BIK"],
  ["BBQ", "0.5m3", "BBQ"],
  ["Large Plant Pot", "1.2m3", "POT"],
  ["Wheelbarrow", "0.4m3", "BAR"],
  ["Small Desk", "0.4m3", "DSK"],
  ["Filing Cabinet", "0.5m3", "CAB"],
  ["Printer", "0.2m3", "PRN"],
  ["Office Partition", "0.5m3", "OFF"],
  ["10 Medium Boxes", "0.6m3", "10"],
  ["Rubbish Bags", "0.3m3", "BAG"],
  ["Flattened Cardboard", "0.3m3", "CAR"],
  ["Bathroom Vanity", "0.6m3", "VAN"],
];

const faqs = [
  {
    q: "Can you quote from photos?",
    a: "Yes. The clearer the photos, the more accurate the quote.",
  },
  {
    q: "Is the price guaranteed?",
    a: "The quote is fixed based on the items shown in the photos. If extra items are added or access is different from what was shown, we'll confirm any change before proceeding.",
  },
  {
    q: "What photos should I send?",
    a: "Wide shots, close-ups, heavy items, access points, stairs, lifts and anything awkward.",
  },
  {
    q: "Do I need to be home?",
    a: "Not always. If access is clear and payment is arranged, pickup may be possible without you there.",
  },
  {
    q: "Do you recycle?",
    a: "Where possible, items are separated for recycling, donation or responsible disposal.",
  },
  {
    q: "Can you do same-day pickup?",
    a: "Depending on availability and location, same-day or next-day pickup may be available.",
  },
];

type PhotoPreview = {
  id: string;
  file: File;
  url: string;
};

type FormErrors = Partial<Record<"name" | "phone" | "email" | "location" | "photos" | "details" | "confirm", string>>;

function scrollToQuote() {
  document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function App() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <Header />
      <main>
        <Hero />
        <ServicesSection />
        <QuoteForm />
        <MethodSection />
        <ServiceAreas />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-ink/94 text-white backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3 font-black tracking-[0.08em]" aria-label="No More Junk home">
          <span className="grid size-9 place-items-center bg-pulse text-ink">
            <Trash2 className="size-5" aria-hidden="true" />
          </span>
          <span>NO MORE JUNK</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-muted lg:flex" aria-label="Main navigation">
          {navItems.map((item) => (
            <a className="transition hover:text-white" href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <button className="hidden items-center gap-2 bg-pulse px-5 py-3 text-sm font-black text-ink transition hover:bg-white lg:inline-flex" onClick={scrollToQuote}>
          Get My Quote
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
        <button
          className="grid size-11 place-items-center border border-white/20 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-panel lg:hidden"
          >
            <div className="grid gap-1 px-5 py-4">
              {navItems.map((item) => (
                <a className="px-2 py-3 text-sm font-bold text-white" href={item.href} key={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              ))}
              <button className="mt-2 bg-pulse px-5 py-4 text-left font-black text-ink" onClick={scrollToQuote}>
                Get My Quote
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink pt-28 text-white sm:pt-32">
      <div className="absolute inset-x-0 top-0 h-px bg-pulse" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-8 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-28 lg:pt-16">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 border border-pulse/45 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-pulse">
            Photo quotes. Fixed price. No pressure.
          </div>
          <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-normal sm:text-6xl lg:text-7xl">
            No more guessing. No more junk.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-200 sm:text-xl">
            Upload photos of what needs to go. We'll review the load and send you a clear fixed-price quote before anyone turns up.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 bg-pulse px-7 py-4 text-base font-black text-ink transition hover:bg-white" onClick={scrollToQuote}>
              Upload Photos For Quote
              <Upload className="size-5" aria-hidden="true" />
            </button>
            <a
              className="inline-flex items-center justify-center gap-2 border border-white/20 px-7 py-4 text-base font-black text-white transition hover:border-pulse hover:text-pulse"
              href="sms:+61000000000"
            >
              Text Photos Instead
              <MessageSquareText className="size-5" aria-hidden="true" />
            </a>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm font-bold text-muted">
            <ShieldCheck className="size-5 text-pulse" aria-hidden="true" />
            Fast quotes. Clear pricing. No driveway surprises.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }}>
          <HeroQuoteCard />
        </motion.div>
      </div>
    </section>
  );
}

function HeroQuoteCard() {
  const steps = [
    ["1", "Upload photos", "Show the full load and access."],
    ["2", "Get a fixed quote", "Written price before arrival."],
    ["3", "Book pickup", "Choose a time that works."],
  ];

  return (
    <div className="relative mx-auto max-w-xl border border-white/10 bg-white p-4 text-ink shadow-lift sm:p-6">
      <div className="absolute -right-4 -top-4 hidden bg-pulse px-5 py-3 text-sm font-black text-ink shadow-glow sm:block">PHOTO QUOTE</div>
      <div className="border border-zinc-200 bg-mist p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">No More Junk</p>
            <h2 className="mt-2 text-2xl font-black">Quote request</h2>
          </div>
          <div className="grid size-12 place-items-center bg-ink text-pulse">
            <FileImage className="size-6" aria-hidden="true" />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-2">
          {[0, 1, 2].map((index) => (
            <div className="flex aspect-square items-center justify-center border border-dashed border-zinc-300 bg-white" key={index}>
              <ImagePlus className="size-7 text-zinc-400" aria-hidden="true" />
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-3">
          {steps.map(([number, title, text]) => (
            <div className="flex gap-4 bg-white p-4" key={title}>
              <span className="grid size-9 shrink-0 place-items-center bg-pulse text-sm font-black">{number}</span>
              <span>
                <strong className="block text-sm font-black">{title}</strong>
                <span className="text-sm text-zinc-600">{text}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 border border-zinc-200 bg-ink p-5 text-white">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-pulse">Price status</p>
          <p className="mt-2 text-xl font-black">Estimated quote ready after photo review</p>
          <p className="mt-2 text-sm text-muted">No instant fake number. A real person checks the job first.</p>
        </div>
      </div>
    </div>
  );
}

function MethodSection() {
  const oldWay = [
    ["?", "Vague price ranges", "Not much help until someone sees the pile."],
    ["!", "Driveway pressure", "The team is there, the truck is there, now you have to decide."],
    ["$", "Surprise changes", "Access, weight and disposal costs can appear late."],
  ];
  const ourWay = [
    ["1", "Send photos", "Wide shots, close-ups, access, stairs and heavy items."],
    ["2", "We review the load", "Pricing factors include volume, weight, labour, access and disposal or recycling requirements."],
    ["3", "Book pickup", "If you are happy with the written price, choose a time and we clear it."],
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionKicker>How it works</SectionKicker>
        <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">The quote should come before the truck.</h2>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-700">Most rubbish removal pages make you book first and negotiate later. No More Junk keeps the pressure out of it.</p>
        <div className="mt-10 grid gap-4 lg:grid-cols-[0.82fr_1.18fr]">
          <MethodPanel kicker="The old way" title="Book now. Find out later." rows={oldWay} />
          <div className="bg-ink p-7 text-white">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-pulse">Our way</p>
            <h3 className="mt-4 text-2xl font-black">Send photos. Get a fixed quote. Then book.</h3>
            <div className="mt-6 grid gap-3">
              {ourWay.map(([number, title, text]) => (
                <div className="grid grid-cols-[44px_1fr] gap-4 bg-panel p-4" key={title}>
                  <b className="grid size-11 place-items-center bg-pulse text-ink">{number}</b>
                  <span>
                    <strong className="block font-black">{title}</strong>
                    <span className="mt-1 block leading-7 text-muted">{text}</span>
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Fixed quote from photos", "No hidden call-out surprises", "Confirmed before booking", "Recycling considered where possible"].map((factor) => (
                <span className="border border-pulse/40 px-3 py-2 text-sm font-black text-pulse" key={factor}>
                  {factor}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MethodPanel({ kicker, title, rows }: { kicker: string; title: string; rows: string[][] }) {
  return (
    <article className="border border-zinc-200 bg-white p-7">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500">{kicker}</p>
      <h3 className="mt-4 text-2xl font-black">{title}</h3>
      <div className="mt-6 grid gap-3">
        {rows.map(([mark, rowTitle, text]) => (
          <div className="grid grid-cols-[44px_1fr] gap-4 bg-mist p-4" key={rowTitle}>
            <b className="grid size-11 place-items-center bg-ink text-white">{mark}</b>
            <span>
              <strong className="block font-black">{rowTitle}</strong>
              <span className="mt-1 block leading-7 text-zinc-700">{text}</span>
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

function QuoteForm() {
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const [details, setDetails] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const charCount = details.length;

  const handleFiles = (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter((file) => file.type.startsWith("image/"));
    const next = files.map((file) => ({
      id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
      file,
      url: URL.createObjectURL(file),
    }));
    setPhotos((current) => [...current, ...next].slice(0, 8));
    setErrors((current) => ({ ...current, photos: undefined }));
  };

  const removePhoto = (id: string) => {
    setPhotos((current) => {
      const target = current.find((photo) => photo.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return current.filter((photo) => photo.id !== id);
    });
  };

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors: FormErrors = {};
    if (!String(formData.get("name") || "").trim()) nextErrors.name = "Enter your name.";
    if (!String(formData.get("phone") || "").trim()) nextErrors.phone = "Enter your phone number.";
    if (!String(formData.get("email") || "").includes("@")) nextErrors.email = "Enter a valid email.";
    if (!String(formData.get("location") || "").trim()) nextErrors.location = "Enter your suburb or postcode.";
    if (photos.length === 0) nextErrors.photos = "Upload at least one photo.";
    if (!details.trim()) nextErrors.details = "Tell us what needs removing.";
    if (formData.get("confirm") !== "on") nextErrors.confirm = "Confirm the photos show the full job.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // TODO: Send email notification with quote request details.
    // TODO: Create or update customer/job record in the CRM.
    // TODO: Connect uploaded photos to SMS/photo quoting workflow.
    // TODO: Store files securely before quote review.
    // TODO: Trigger booking system once the fixed quote is accepted.
    photos.forEach((photo) => URL.revokeObjectURL(photo.url));
    setSubmitted(true);
    event.currentTarget.reset();
    setDetails("");
    setPhotos([]);
  };

  return (
    <section id="quote" className="scroll-mt-24 bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
        <div>
          <SectionKicker dark>Get quoted</SectionKicker>
          <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Start your photo quote.</h2>
          <p className="mt-5 text-lg leading-8 text-zinc-300">
            Upload the photos and the job details. We will review the load and reply with a clear written price.
          </p>
          <div className="mt-8 grid gap-3 text-sm font-bold text-zinc-200">
            {["Upload up to 8 photos", "Add access and timing", "Price confirmed before booking"].map((item) => (
              <p className="flex items-center gap-3" key={item}>
                <Check className="size-5 text-pulse" aria-hidden="true" />
                {item}
              </p>
            ))}
          </div>
          <div className="mt-8 border border-pulse/50 bg-panel p-6">
            <strong className="block text-2xl font-black leading-tight text-pulse sm:text-3xl">Got a written quote? We'll aim to beat it by 10%.</strong>
            <span className="mt-3 block leading-7 text-muted">Send the quote with your photos. Where possible, we'll sharpen the price before you book.</span>
          </div>
        </div>
        <form className="bg-white p-4 text-ink shadow-lift sm:p-6" onSubmit={onSubmit} noValidate>
          {submitted ? (
            <SuccessState onReset={() => setSubmitted(false)} />
          ) : (
            <div className="grid gap-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Name" name="name" error={errors.name} autoComplete="name" />
                <TextField label="Phone" name="phone" type="tel" error={errors.phone} autoComplete="tel" />
                <TextField label="Email" name="email" type="email" error={errors.email} autoComplete="email" />
                <TextField label="Suburb/postcode" name="location" error={errors.location} autoComplete="postal-code" />
              </div>

              <div>
                <span className="mb-2 block text-sm font-black">Upload photos</span>
                <label
                  className={`flex min-h-44 cursor-pointer flex-col items-center justify-center border-2 border-dashed p-6 text-center transition ${
                    isDragging ? "border-pulse bg-pulse/10" : "border-zinc-300 bg-mist hover:border-ink"
                  }`}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={onDrop}
                >
                  <input
                    className="sr-only"
                    type="file"
                    name="photos"
                    accept="image/*"
                    multiple
                    onChange={(event: ChangeEvent<HTMLInputElement>) => event.target.files && handleFiles(event.target.files)}
                  />
                  <span className="grid size-14 place-items-center bg-ink text-pulse">
                    <Upload className="size-7" aria-hidden="true" />
                  </span>
                  <span className="mt-4 text-lg font-black">Drag photos here or tap to upload</span>
                  <span className="mt-2 max-w-md text-sm leading-6 text-zinc-600">Wide shots, close-ups, access, stairs, lifts and heavy items. JPG, PNG or HEIC photos are fine.</span>
                </label>
                {errors.photos && <FieldError message={errors.photos} />}
                {photos.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {photos.map((photo) => (
                      <div className="group relative aspect-square overflow-hidden bg-zinc-100" key={photo.id}>
                        <img className="size-full object-cover" src={photo.url} alt={photo.file.name} />
                        <button
                          className="absolute right-2 top-2 grid size-8 place-items-center bg-ink text-white opacity-95 transition hover:bg-pulse hover:text-ink"
                          type="button"
                          onClick={() => removePhoto(photo.id)}
                          aria-label={`Remove ${photo.file.name}`}
                        >
                          <X className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-black" htmlFor="details">
                  What needs removing?
                </label>
                <textarea
                  id="details"
                  name="details"
                  value={details}
                  onChange={(event) => {
                    setDetails(event.target.value.slice(0, 500));
                    setErrors((current) => ({ ...current, details: undefined }));
                  }}
                  className="min-h-32 w-full border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-ink focus:ring-4 focus:ring-pulse/30"
                  placeholder="Example: 2 couches, mattress, boxes, old shelving. Driveway access, no stairs."
                />
                <div className="mt-2 flex items-center justify-between gap-3 text-sm text-zinc-500">
                  {errors.details ? <FieldError message={errors.details} compact /> : <span>Keep it plain. We read it.</span>}
                  <span>{charCount}/500</span>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <SelectField
                  label="Access details"
                  name="access"
                  options={["Ground floor / easy access", "Stairs", "Lift access", "Tight access", "Not sure"]}
                />
                <SelectField label="Preferred pickup timing" name="timing" options={["Today", "Tomorrow", "This week", "Flexible"]} />
              </div>

              <div>
                <label className="flex gap-3 border border-zinc-200 bg-mist p-4 text-sm font-bold leading-6">
                  <input className="mt-1 size-4 accent-pulse" type="checkbox" name="confirm" onChange={() => setErrors((current) => ({ ...current, confirm: undefined }))} />
                  <span>I confirm the photos show everything I want removed.</span>
                </label>
                {errors.confirm && <FieldError message={errors.confirm} />}
              </div>

              <button className="inline-flex items-center justify-center gap-3 bg-pulse px-7 py-5 text-base font-black text-ink transition hover:bg-ink hover:text-white" type="submit">
                Send My Photos For Quote
                <ArrowRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="grid min-h-[520px] place-items-center bg-mist p-8 text-center">
      <div>
        <div className="mx-auto grid size-16 place-items-center bg-pulse text-ink">
          <BadgeCheck className="size-9" aria-hidden="true" />
        </div>
        <h3 className="mt-6 text-3xl font-black">Photos received.</h3>
        <p className="mx-auto mt-3 max-w-md text-lg leading-8 text-zinc-700">We'll review and send your quote shortly.</p>
        <button className="mt-7 border border-ink px-6 py-3 font-black transition hover:bg-ink hover:text-white" type="button" onClick={onReset}>
          Send another request
        </button>
      </div>
    </div>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-24 bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionKicker>What we take</SectionKicker>
            <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">How much space does your junk take up?</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-700">
              We quote by the load, not by making up a number in your driveway. These are rough volume guides only. Send photos for the fixed price.
            </p>
          </div>
          <button className="inline-flex w-fit items-center gap-2 border border-ink px-5 py-3 font-black transition hover:bg-ink hover:text-white" onClick={scrollToQuote}>
            Not sure? Send photos.
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-10 overflow-hidden border-2 border-pulse bg-ink text-white">
          <div className="grid gap-6 p-6 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <h3 className="max-w-3xl text-4xl font-black uppercase leading-none sm:text-6xl">
                Common items and the space <span className="text-pulse">your junk</span> takes up.
              </h3>
              <p className="mt-5 inline-flex bg-pulse px-4 py-3 text-lg font-black uppercase text-ink">You only pay for the junk we remove.</p>
            </div>
            <div className="grid gap-4">
              {[
                ["Fast pickup", "We do the loading and heavy lifting.", "TRK"],
                ["Fair pricing", "Quoted from photos before we arrive.", "$"],
                ["Better planet", "Recycle, donate and landfill less where possible.", "RE"],
              ].map(([title, text, icon]) => (
                <div className="grid grid-cols-[52px_1fr] items-center gap-4" key={title}>
                  <span className="grid size-[52px] place-items-center border-2 border-pulse text-sm font-black text-pulse">{icon}</span>
                  <span>
                    <strong className="block font-black uppercase text-pulse">{title}</strong>
                    <span className="text-sm leading-6 text-zinc-200">{text}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid border-t-2 border-pulse bg-white text-ink lg:grid-cols-[150px_1fr_300px]">
            <div className="grid grid-cols-2 bg-ink text-pulse sm:grid-cols-3 lg:grid-cols-1">
              {volumeCategories.map((category) => (
                <div className="grid min-h-20 place-items-center border-b border-pulse/35 p-3 text-center text-xs font-black uppercase" key={category}>
                  {category}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {volumeItems.map(([name, volume, code]) => (
                <div className="grid min-h-28 place-items-center gap-2 border-b border-r border-zinc-200 p-3 text-center" key={name}>
                  <div className="grid h-11 w-16 place-items-center border border-zinc-300 bg-mist text-sm font-black text-zinc-600">{code}</div>
                  <strong className="text-xs font-black leading-tight">{name}</strong>
                  <em className="text-sm font-black not-italic text-green-700">≈ {volume}</em>
                </div>
              ))}
            </div>
            <aside className="border-t-2 border-pulse bg-ink text-white lg:border-l-2 lg:border-t-0">
              <div className="bg-pulse p-3 text-center font-black uppercase text-ink">Example selection</div>
              {["3 Seater Couch", "Fridge", "Washing Machine", "Dining Table + Chairs", "Rubbish Bags"].map((item, index) => (
                <div className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-white p-3 text-sm text-ink" key={item}>
                  <span>
                    <strong className="block font-black">{item}</strong>
                    <span className="text-zinc-600">{index === 4 ? "0.3m3 per 10 bags" : "Approx. item volume"}</span>
                  </span>
                  <span className="border border-zinc-200 bg-mist px-3 py-1 font-black">{index === 4 ? 2 : 1}</span>
                </div>
              ))}
              <div className="p-5">
                <p className="font-black uppercase text-pulse">Estimated total volume</p>
                <strong className="mt-1 block text-6xl font-black leading-none text-pulse">5.1m3</strong>
                <div className="mt-5 grid gap-2 border-t border-pulse/40 pt-4 text-sm">
                  <p>0 - 0.5m3 Small load</p>
                  <p>1 - 2m3 Small apartment cleanout</p>
                  <p className="bg-pulse p-2 font-black text-ink">2 - 3m3 Most common load, roughly half a garage</p>
                  <p>3 - 6m3 Larger cleanout or moving leftovers</p>
                  <p>6m3+ Large garage, house or commercial load</p>
                </div>
              </div>
            </aside>
          </div>
          <div className="grid gap-5 border-t-2 border-pulse p-6 lg:grid-cols-[1fr_1fr_auto] lg:items-center">
            <p className="leading-7 text-zinc-200"><strong className="block text-pulse">Please note</strong> This is only a rough estimate. Final pricing depends on actual volume, access, item type, weight and disposal requirements.</p>
            <p className="leading-7 text-zinc-200"><strong className="block text-pulse">Not sure?</strong> Send us photos. It is the easiest way to get an accurate quote.</p>
            <button className="bg-pulse px-6 py-4 font-black text-ink transition hover:bg-white" onClick={scrollToQuote}>Get a Quote</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const benefits: Array<[string, LucideIcon]> = [
    ["Photos first", ImagePlus],
    ["Clear price", BadgeCheck],
    ["Fast pickup", CalendarCheck],
    ["Real humans", MessageSquareText],
    ["Recycling-first mindset", Recycle],
    ["No pressure sales pitch", ShieldCheck],
  ];

  return (
    <section className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionKicker dark>Why choose us</SectionKicker>
        <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">Built for people who hate mucking around.</h2>
        <div className="mt-10 grid gap-px bg-white/[0.12] sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(([label, Icon]) => (
            <div className="bg-panel p-7" key={label}>
              <Icon className="mb-8 size-8 text-pulse" aria-hidden="true" />
              <h3 className="text-2xl font-black">{label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceAreas() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <SectionKicker>Service areas</SectionKicker>
            <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Starting where the junk piles up.</h2>
            <p className="mt-5 text-lg leading-8 text-zinc-700">More locations can be added without changing the page structure.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {areas.map((area) => (
              <AreaCard area={area} key={area} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AreaCard({ area }: { area: string }) {
  return (
    <div className="border border-zinc-200 bg-mist p-7">
      <p className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Now quoting</p>
      <h3 className="mt-4 text-3xl font-black">{area}</h3>
    </div>
  );
}

function FAQ() {
  const [active, setActive] = useState(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-mist py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
        <SectionKicker>FAQ</SectionKicker>
        <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">Straight answers.</h2>
        <div className="mt-10 divide-y divide-zinc-200 border-y border-zinc-200 bg-white">
          {faqs.map((faq, index) => {
            const isOpen = active === index;
            return (
              <div key={faq.q}>
                <button
                  className="flex w-full items-center justify-between gap-4 px-5 py-6 text-left text-lg font-black"
                  onClick={() => setActive(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  {faq.q}
                  <ChevronDown className={`size-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="px-5 pb-6 leading-8 text-zinc-700">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-pulse py-16 text-ink sm:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-7 px-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <h2 className="text-4xl font-black leading-tight sm:text-5xl">Ready to get rid of it?</h2>
          <p className="mt-3 text-xl font-bold">Send the photos. Get the price. Book the pickup.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-3 bg-ink px-8 py-5 font-black text-white transition hover:bg-white hover:text-ink" onClick={scrollToQuote}>
          Upload Photos Now
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink px-5 pb-28 pt-12 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <p className="text-xl font-black tracking-[0.08em]">NO MORE JUNK</p>
          <p className="mt-4 max-w-md leading-7 text-muted">Photo-first rubbish removal quotes for Brisbane and Melbourne. Clear price before pickup.</p>
        </div>
        <div className="grid gap-3 text-sm">
          <a className="flex items-center gap-2 text-muted hover:text-pulse" href="tel:+61000000000">
            <Phone className="size-4" aria-hidden="true" />
            Phone placeholder
          </a>
          <a className="flex items-center gap-2 text-muted hover:text-pulse" href="mailto:quotes@nomorejunk.example">
            <Mail className="size-4" aria-hidden="true" />
            Email placeholder
          </a>
        </div>
        <div className="grid gap-3 text-sm text-muted">
          <p>Service areas: Brisbane, Melbourne</p>
          <a className="hover:text-pulse" href="#">
            Privacy policy
          </a>
          <a className="hover:text-pulse" href="#">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink p-3 shadow-lift sm:hidden">
      <button className="flex w-full items-center justify-center gap-2 bg-pulse px-5 py-4 font-black text-ink" onClick={scrollToQuote}>
        Get Photo Quote
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

function TextField({
  label,
  name,
  type = "text",
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className={`w-full border bg-white px-4 py-3 outline-none transition focus:border-ink focus:ring-4 focus:ring-pulse/30 ${
          error ? "border-red-600" : "border-zinc-300"
        }`}
      />
      {error && <FieldError message={error} />}
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  const id = useMemo(() => `${name}-select`, [name]);
  return (
    <div>
      <label className="mb-2 block text-sm font-black" htmlFor={id}>
        {label}
      </label>
      <select id={id} name={name} className="w-full appearance-none border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-ink focus:ring-4 focus:ring-pulse/30">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

function FieldError({ message, compact = false }: { message: string; compact?: boolean }) {
  return <p className={`${compact ? "" : "mt-2"} text-sm font-bold text-red-600`}>{message}</p>;
}

function SectionKicker({ children, dark = false }: { children: string; dark?: boolean }) {
  return <p className={`text-xs font-black uppercase tracking-[0.24em] ${dark ? "text-pulse" : "text-zinc-500"}`}>{children}</p>;
}

export default App;
