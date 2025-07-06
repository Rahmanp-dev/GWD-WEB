import { GlassCard } from "../ui/GlassCard";
import { NeonButton } from "../ui/NeonButton";

interface Project {
  id: string;
  name: string;
  stage: string;
}

type ProjectKanbanProps = {
  projects: Project[];
  onMove: (id: string, stage: string) => void;
};

const stages = ["Approved", "In Progress", "Review", "Completed"];

export function ProjectKanban({ projects, onMove }: ProjectKanbanProps) {
  return (
    <div className="flex gap-4" role="list" aria-label="Project Kanban Board">
      {stages.map((stage, idx) => (
        <GlassCard
          key={stage}
          className="w-64 min-h-[400px]"
          motionProps={{ transition: { delay: 0.1 + idx * 0.07 } }}
        >
          <h3
            className="font-bold mb-2"
            id={`kanban-col-${stage.toLowerCase().replace(/\s/g, "-")}`}
            tabIndex={0}
            aria-label={`${stage} column`}
            title={`${stage} column`}
          >
            {stage}
          </h3>
          <div
            role="list"
            aria-labelledby={`kanban-col-${stage
              .toLowerCase()
              .replace(/\s/g, "-")}`}
          >
            {projects
              .filter((p: Project) => p.stage === stage)
              .map((project: Project) => (
                <div
                  key={project.id}
                  className="mb-2 p-2 glass-panel hover:bg-gray-100/70 focus-within:bg-gray-200/80 rounded transition-colors duration-200"
                  tabIndex={0}
                  aria-label={`Project: ${project.name}`}
                  role="listitem"
                >
                  <div className="font-medium text-gray-900">
                    {project.name}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {stages
                      .filter((s) => s !== stage)
                      .map((s) => (
                        <NeonButton
                          key={s}
                          onClick={() => onMove(project.id, s)}
                          aria-label={`Move ${project.name} to ${s}`}
                          title={`Move ${project.name} to ${s}`}
                          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        >
                          {s}
                        </NeonButton>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
