# Take Home Exercise - Event Emitter

## Check if the implementation has any issues

**Answer:** It works properly.

    const handlers: { [key: string]: Function } = {};

    const trigger = (type: string): void => {
      handlers[type]();
    };

    const on = (type: string, handler: Function): void => {
      handlers[type] = handler;
    };

    on("foo", (): void => {
      console.log("Do foo");
    });

    trigger("foo");

    // log:
    // Do foo

## How do we let you add more than 1 handler for the same type?

**Answer:** `on()` sets `handlers[type]` as an array of handlers and `trigger()` iterates over them.

    const handlers: { [key: string]: Array<Function> } = {};

    const trigger = (type: string): void => {
      handlers[type].forEach((handler: Function) => handler());
    };

    const on = (type: string, handler: Function): void => {
      handlers[type] ? handlers[type].push(handler) : (handlers[type] = [handler]);
    };

    on("foo", (): void => {
      console.log("Do foo");
    });

    on("foo", (): void => {
      console.log("Do some other foo");
    });

    trigger("foo");

    // log:
    // Do foo
    // Do some other foo

## How do we add an off method?

**Answer:** `off()` iterates over each handler in `handlers[type]`, compares it to the provided one, and removes it when matching.

    const handlers: { [key: string]: Array<Function> } = {};

    const trigger = (type: string): void => {
      handlers[type].forEach((handler: Function) => handler());
    };

    const on = (type: string, handler: Function): void => {
      handlers[type] ? handlers[type].push(handler) : (handlers[type] = [handler]);
    };

    const off = (type: string, handler: Function): void => {
      if (handlers[type])
        handlers[type].forEach((handler2: Function, index: number) => {
          if (handler2.toString() === handler.toString()) {
            handlers[type].splice(index, 1);
          }
        });
    };

    on("foo", (): void => {
      console.log("Do foo");
    });

    on("foo", (): void => {
      console.log("Do some other foo");
    });

    off("foo", (): void => {
      console.log("Do some other foo");
    });

    trigger("foo");

    // log:
    // Do foo

## How do I allow you to pass arbitrary arguments?

**Answer:** `on()`'s callback function takes an optional array of arguments passed by `trigger()`.

    const handlers: { [key: string]: Array<Function> } = {};

    const trigger = (type: string, args?: Array<string>): void => {
      handlers[type].forEach((handler: Function) => {
        args ? handler(args) : handler();
      });
    };

    const on = (type: string, handler: Function): void => {
      handlers[type] ? handlers[type].push(handler) : (handlers[type] = [handler]);
    };

    const off = (type: string, handler: Function) => {
      if (handlers[type])
        handlers[type].forEach((handler2: Function, index: number) => {
          if (handler2.toString() === handler.toString()) {
            handlers[type].splice(index, 1);
          }
        });
    };

    on("foo", (): void => {
      console.log("Do foo");
    });

    on("foo", (): void => {
      console.log("Do some other foo");
    });

    off("foo", (): void => {
      console.log("Do some other foo");
    });

    on("foo", (args?: Array<string>) => {
      args ? console.log("Here are my args:", args.toString()) : console.log("No args");
    });

    trigger("foo", ["arg1", "arg2"]);

    // log:
    // Do foo
    // Here are my args: arg1,arg2
