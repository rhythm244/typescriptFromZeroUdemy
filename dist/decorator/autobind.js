export function autobind(_, _2, descriptor) {
    console.log(descriptor);
    const originMethod = descriptor.value;
    const adjdDescriptor = {
        configurable: true,
        get() {
            const boundFn = originMethod.bind(this);
            return boundFn;
        },
    };
    return adjdDescriptor;
}
