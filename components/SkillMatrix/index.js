import { useMemo, useState } from "react";
import Image from "next/legacy/image";

const LEVEL_STYLES = {
  production: {
    label: "Production",
    badgeClass: "bg-emerald-500/20 text-emerald-200 border-emerald-400/40",
    dotClass: "bg-emerald-400",
  },
  nonProd: {
    label: "Non-Prod",
    badgeClass: "bg-amber-500/20 text-amber-100 border-amber-400/40",
    dotClass: "bg-amber-400",
  },
  poc: {
    label: "POC",
    badgeClass: "bg-slate-500/20 text-slate-200 border-slate-400/40",
    dotClass: "bg-slate-400",
  },
};

const SkillMatrix = ({ data }) => {
  const [activeSkill, setActiveSkill] = useState(null);

  const legendItems = useMemo(() => {
    if (!data?.legend?.length) {
      return Object.values(LEVEL_STYLES).map((item, index) => ({
        ...item,
        level: Object.keys(LEVEL_STYLES)[index],
      }));
    }

    return data.legend.map((item) => ({
      ...LEVEL_STYLES[item.level],
      ...item,
    }));
  }, [data?.legend]);

  if (!data?.categories?.length) {
    return null;
  }

  const handleSkillOpen = (skill, categoryTitle) => {
    setActiveSkill({ ...skill, categoryTitle });
  };

  const handleCloseModal = () => setActiveSkill(null);

  return (
    <section className="mt-10 laptop:mt-24 p-2 laptop:p-0">
      <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center tablet:justify-between">
        <h2 className="text-2xl font-semibold">Skills.</h2>
        <div className="flex flex-wrap gap-3">
          {legendItems.map((item) => (
            <span
              key={item.level || item.label}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${
                item.badgeClass || "border-white/20 bg-white/10 text-white"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  item.dotClass || "bg-white/60"
                }`}
              />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 laptop:grid-cols-2">
        {data.categories.map((category) => (
          <div
            key={category.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10 backdrop-blur-md dark:border-white/10 dark:bg-white/5"
          >
            <h3 className="text-lg font-semibold tracking-wide text-white">
              {category.title}
            </h3>
            <div className="mt-4 grid grid-cols-1 gap-3 tablet:grid-cols-2">
              {category.skills.map((skill) => {
                const levelStyle = LEVEL_STYLES[skill.level] || {};
                return (
                  <button
                    type="button"
                    key={skill.id}
                    onClick={() => handleSkillOpen(skill, category.title)}
                    className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:-translate-y-1 hover:border-white/40 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    <span className="relative h-10 w-10 overflow-hidden rounded-xl bg-black/10">
                      {skill.icon ? (
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          layout="fill"
                          objectFit="contain"
                        />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-lg font-semibold text-white/70">
                          {skill.name ? skill.name.charAt(0) : ""}
                        </span>
                      )}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-white">
                        {skill.name}
                      </span>
                      <span className="mt-1 inline-flex items-center gap-2 text-[11px] uppercase tracking-wide text-white/60">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            levelStyle.dotClass || "bg-white/50"
                          }`}
                        />
                        {levelStyle.label || skill.level}
                      </span>
                    </span>
                    <span className="text-white/40 transition group-hover:text-white">↗</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {activeSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-neutral-900/95 p-6 text-white shadow-2xl">
            <div className="flex flex-col items-start gap-4 tablet:flex-row tablet:items-center">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-black/10">
                {activeSkill.icon ? (
                  <Image
                    src={activeSkill.icon}
                    alt={activeSkill.name}
                    layout="fill"
                    objectFit="contain"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center text-2xl font-semibold text-white/80">
                    {activeSkill.name ? activeSkill.name.charAt(0) : ""}
                  </span>
                )}
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-white/60">
                  {activeSkill.categoryTitle}
                </p>
                <h4 className="mt-1 text-2xl font-semibold">
                  {activeSkill.name}
                </h4>
                <span
                  className={`mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    (LEVEL_STYLES[activeSkill.level] || {}).badgeClass ||
                    "border-white/20 bg-white/10"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      (LEVEL_STYLES[activeSkill.level] || {}).dotClass ||
                      "bg-white/60"
                    }`}
                  />
                  {(LEVEL_STYLES[activeSkill.level] || {}).label ||
                    activeSkill.level}
                </span>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/80">
              {activeSkill.detail}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SkillMatrix;
