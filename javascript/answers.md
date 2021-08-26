# Take Home Exercise - Event Emitter

## Check if the implementation has any issues

**Answer:** It works properly.

    const handlers = {};

    const trigger = (type) => {
      handlers[type]();
    };

    const on = (type, handler) => {
      handlers[type] = handler;
    };

    on('foo', () => {
      console.log('Do foo');
    });

    trigger('foo');

    // log:
    // Do foo

## How do we let you add more than 1 handler for the same type?

**Answer:** `on()` sets `handlers[type]` as an array of handlers and `trigger()` iterates over them.

    const handlers = {};

    const trigger = (type) => {
      handlers[type].forEach((handler) => handler());
    };

    const on = (type, handler) => {
      handlers[type] ? handlers[type].push(handler) : (handlers[type] = [handler]);
    };

    on("foo", () => {
      console.log("Do foo");
    });

    on("foo", () => {
      console.log("Do some other foo");
    });

    trigger("foo");

    // log:
    // Do foo
    // Do some other foo

## How do we add an off method?

**Answer:** `off()` iterates over each handler in `handlers[type]`, compares it to the provided one, and removes it when matching.

    const handlers = {};

    const trigger = (type) => {
      handlers[type].forEach((handler) => handler());
    };

    const on = (type, handler) => {
      handlers[type] ? handlers[type].push(handler) : (handlers[type] = [handler]);
    };

    const off = (type, handler) => {
      if (handlers[type])
        handlers[type].forEach((handler2, index) => {
          if (handler2.toString() === handler.toString()) {
            handlers[type].splice(index, 1);
          }
        });
    };

    on("foo", () => {
      console.log("Do foo");
    });

    on("foo", () => {
      console.log("Do some other foo");
    });

    off("foo", () => {
      console.log("Do some other foo");
    });

    trigger("foo");

    // log:
    // Do foo

## How do I allow you to pass arbitrary arguments?

**Answer:** `on()`'s callback function takes an optional array of arguments passed by `trigger()`.

    const handlers = {};

    const trigger = (type, args) => {
      handlers[type].forEach((handler) => {
        args ? handler(args) : handler();
      });
    };

    const on = (type, handler) => {
      handlers[type] ? handlers[type].push(handler) : (handlers[type] = [handler]);
    };

    const off = (type, handler) => {
      handlers[type].forEach((handler2, index) => {
        if (handler2.toString() === handler.toString()) {
          handlers[type].splice(index, 1);
        }
      });
    };

    on("foo", () => {
      console.log("Do foo");
    });

    on("foo", () => {
      console.log("Do some other foo");
    });

    off("foo", () => {
      console.log("Do some other foo");
    });

    on("foo", (args) => {
      args ? console.log("Here are my args:", args.toString()) : console.log("No args");
    });

    trigger("foo", ["arg1", "arg2"]);

    // log:
    // Do foo
    // Here are my args: arg1,arg2
