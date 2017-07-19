declare module 'clear-require' {

    namespace clear {
        function all(): void;
        // function match(regex: RegExp): void;
    }

    function clear(moduleId: string): boolean;

    export = clear;
}
