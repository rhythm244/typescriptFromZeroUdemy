
  //auto bind decorator
  export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    console.log(descriptor);
    const originMethod = descriptor.value;
    const adjdDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originMethod.bind(this);
        return boundFn;
      },
    };

    return adjdDescriptor;
  }

