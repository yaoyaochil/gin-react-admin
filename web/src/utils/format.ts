

// 格式化时间2024-05-11T17:34:18+08:00 => 2024-05-11 17:34:18
export function formatTime(time: string): string {
  return time.replace('T', ' ').replace('+08:00', '');
}