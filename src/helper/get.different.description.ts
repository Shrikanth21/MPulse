const randomString = (suffix: string) =>
    `new ${Math.random().toString(36).substring(2, 8).toUpperCase()}${suffix}`;

export const generatedDescription = randomString(' wko_SK');
export const generatedBuildingTaskDescription = randomString('_Building_TASK_SK');
export const generatedEqTaskDescription = randomString(' eq_task_SK');
