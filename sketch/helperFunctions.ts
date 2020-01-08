
function clone<T extends Object>(instance: T): T {
    const copy = new (instance.constructor as { new (): T })();
    (Object as any).assign(copy, instance);
    return copy;
}