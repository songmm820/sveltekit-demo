/**
 * 节流函数
 * 
 * @param fn 要节流的函数
 * @param interval 节流间隔（毫秒），默认 300ms
 * @param immediate 是否立即执行（首次调用执行，后续间隔内忽略），默认 true
 * @returns 节流后的函数
 */
export function throttle<F extends (...args: Parameters<F>) => ReturnType<F>>(
  fn: F,
  interval: number = 300,
  immediate: boolean = true
): F {
  let lastExecuteTime: number = 0;

  const throttledFunc = function (
    this: ThisParameterType<F>,
    ...args: Parameters<F>
  ): void {
    const now = Date.now();

    if (immediate && lastExecuteTime === 0) {
      fn.apply(this, args);
      lastExecuteTime = now;
      return;
    }

    if (now - lastExecuteTime >= interval) {
      fn.apply(this, args);
      lastExecuteTime = now;
    }
  } as F;

  return throttledFunc;
}