import Link from "next/link";
import Image from "next/image";
import { getWorkPortfolio } from "@/application/get-work-portfolio";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { BorderBeam } from "@/components/ui/border-beam";
import { MagicCard } from "@/components/ui/magic-card";
import { BlurFade } from "@/components/ui/blur-fade";
import { SectionReveal } from "@/components/marketing/section-reveal";
import { AppleCardsCarousel, type AppleCard } from "@/components/ui/apple-cards-carousel";
import { DirectionAwareHover, type DirectionItem } from "@/components/ui/direction-aware-hover";

export const metadata = {
  title: "Work",
};

export default async function WorkPage() {
  const projects = await getWorkPortfolio();

  const carouselItems: AppleCard[] = projects.map((p) => ({
    title: p.title,
    category: "Case study",
    description: p.summary,
    src: p.heroImage,
    content: (
      <Link href={`/work/${p.slug}`} className="font-medium text-[var(--text-primary)] underline-offset-4 hover:underline">
        Read case study &rarr;
      </Link>
    ),
  }));

  const galleryItems: DirectionItem[] = projects.map((p) => ({
    title: p.title,
    description: p.summary,
    image: p.heroImage,
  }));

  return (
    <div className="bg-[var(--bg-page)] py-[var(--space-section)] pb-28">
      <div className="mx-auto max-w-[min(90rem,92vw)] px-4">
        <SectionReveal
          title="Work"
          subtitle="Case studies in multi-agent systems, computer vision, and real-time platforms."
        />

        <div className="mt-12">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
            Featured
          </p>
          <AppleCardsCarousel items={carouselItems} />
        </div>

        <div className="mt-20">
          <h2 className="mb-6 font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)]">
            All projects
          </h2>
          <DirectionAwareHover items={galleryItems} />
        </div>

        <div className="mt-20">
          <h2 className="mb-6 font-display text-2xl font-semibold tracking-tighter text-[var(--text-primary)]">
            In detail
          </h2>
          <BentoGrid>
            {projects.map((project, index) => {
              const featured = project.featured || index === 0;
              return (
                <BlurFade
                  key={project.slug}
                  delay={0.08 * index}
                  inView
                  className={featured ? "md:col-span-2 md:row-span-2" : ""}
                >
                  <Link href={`/work/${project.slug}`} className="block h-full">
                    <MagicCard
                      className="h-full rounded-xl p-0"
                      gradientFrom="#000000"
                      gradientTo="#525252"
                      gradientColor="#e5e5e5"
                    >
                      <BentoGridItem
                        className="relative h-full min-h-[240px] border-[var(--border)] bg-[var(--bg-surface)]"
                        title={project.title}
                        description={project.summary}
                        header={
                          <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
                            <Image
                              src={project.heroImage}
                              alt=""
                              fill
                              className="object-cover"
                            />
                            {featured && (
                              <BorderBeam
                                size={250}
                                duration={12}
                                colorFrom="#000000"
                                colorTo="#525252"
                              />
                            )}
                          </div>
                        }
                      />
                    </MagicCard>
                  </Link>
                </BlurFade>
              );
            })}
          </BentoGrid>
        </div>
      </div>
    </div>
  );
}
