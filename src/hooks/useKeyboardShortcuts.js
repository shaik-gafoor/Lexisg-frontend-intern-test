import { useEffect } from "react";

const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      shortcuts.forEach(({ key, ctrlKey, shiftKey, altKey, callback }) => {
        if (
          event.key === key &&
          !!event.ctrlKey === !!ctrlKey &&
          !!event.shiftKey === !!shiftKey &&
          !!event.altKey === !!altKey
        ) {
          event.preventDefault();
          callback();
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts]);
};

export default useKeyboardShortcuts;
