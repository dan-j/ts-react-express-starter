// Type definitions for clear-require 2.0
// Project: https://github.com/sindresorhus/clear-module
// Definitions by: dan-j <https://github.com/dan-j>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

interface Clear {
    (moduleId: string): boolean;
    all(): void;
    match(regex: RegExp): void;
}

declare const clear: Clear;

export = clear;
