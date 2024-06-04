

// 格式化时间2024-05-11T17:34:18+08:00 => 2024-05-11 17:34:18
import {RouterType} from "@/store/routerStore.tsx";

export function formatTime(time: string): string {
  return time.replace('T', ' ').replace('+08:00', '');
}


export const findPathLabels = (node: RouterType, targetPath: string, basePath: string = ''): (string | undefined)[] | null => {
  const currentPath = `${basePath}/${node.path}`.replace('//', '/');

  if (currentPath === targetPath) {
    return [node.label];
  }

  if (node.children) {
    for (const child of node.children) {
      const result = findPathLabels(child, targetPath, currentPath);
      if (result) {
        return [node.label, ...result];
      }
    }
  }

  return null;
};