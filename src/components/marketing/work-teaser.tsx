import Link from "next/link";
import Image from "next/image";
import { getWorkPortfolio } from "@/application/get-work-portfolio";
import { MagicCard } from "@/components/ui/magic-card";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { BorderBeam } from "@/components/ui/border-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import { SectionReveal } from "@/components/marketing/section-reveal";

export async function WorkTeaser() {
  const projects = await getWorkPortfolio();

  return (
    <section className="bg-[var(--bg-page)] py-[var(--space-section)]">
      <div className="mx-auto max-w-[min(90rem,92vw)] px-4">
        <SectionReveal
          title="Selected Work"
          subtitle="Case studies across clinical AI, computer vision, and real-time systems."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const featured = project.featured || index === 0;
            const card = (
              <Link
                href={`/work/${project.slug}`}
                className="group block h-full"
              >
                <div className="hover-elevate relative h-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-1">
                  {featured && (
                    <BorderBeam
                      size={200}
                      duration={10}
                      colorFrom="#000000"
                      colorTo="#525252"
                    />
                  )}
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <Image
                      src={project.heroImage}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-semibold tracking-tighter text-[var(--text-primary)]">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">
                      {project.summary}
                    </p>
                  </div>
                </div>
              </Link>
            );

            return (
              <BlurFade key={project.slug} delay={0.1 * index} inView>
                {featured ? (
                  <CardSpotlight
                    className="h-full border-transparent bg-transparent p-0"
                    color="#222222"
                    radius={280}
                  >
                    {card}
                  </CardSpotlight>
                ) : (
                  <CardContainer containerClassName="py-0" className="w-full">
                    <CardBody className="h-auto w-full">
                      <CardItem translateZ={40} className="w-full">
                        <MagicCard
                          className="h-full rounded-xl border-transparent bg-transparent p-0"
                          gradientFrom="#000000"
                          gradientTo="#525252"
                          gradientColor="#e5e5e5"
                        >
                          {card}
                        </MagicCard>
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                )}
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
