import type { BootcampReport } from "@/types/output";

function list(items: string[]): string {
  return items.length > 0
    ? items.map((item) => `- ${item}`).join("\n")
    : "- Not provided in the source notes.";
}

export function exportBootcampMarkdown(report: BootcampReport): string {
  return `# ${report.sprintName} — Bootcamp Report

${report.sprintGoal ? `**Sprint goal:** ${report.sprintGoal}\n\n` : ""}Generated from the team's supplied progress notes. Unverified work is not marked as complete.

## Daily Scrum

### Completed
${list(report.dailyScrum.completed)}

### In Progress
${list(report.dailyScrum.inProgress)}

### Blockers
${list(report.dailyScrum.blockers)}

### Next
${list(report.dailyScrum.next)}

## Product Status

${report.productStatus}

## Backlog Update

${report.backlogUpdate.explanation}

### Done
${list(report.backlogUpdate.done)}

### In Progress
${list(report.backlogUpdate.inProgress)}

### Carried Over
${list(report.backlogUpdate.carriedOver)}

## Sprint Review

${report.sprintReview.summary}

### Completed
${list(report.sprintReview.completed)}

### Evidence
${list(report.sprintReview.evidence)}

### Not Completed or Unverified
${list(report.sprintReview.notCompleted)}

## Sprint Retrospective

### What Went Well
${list(report.sprintRetrospective.wentWell)}

### Challenges
${list(report.sprintRetrospective.challenges)}

### Actions
${list(report.sprintRetrospective.actions)}

## README Sprint Section

${report.readmeSprintSection}

## Missing Information
${list(report.missingInformation)}
`;
}
