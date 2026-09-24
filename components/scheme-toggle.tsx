"use client";

import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

/**
 * The `value`s are next-themes' theme names and must not change: "system" is
 * the fixed value that makes it follow the OS. The `label` is what people see
 * (via assistive tech) and mirrors macOS's Light / Dark / Auto.
 */
const MODES = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "Auto", Icon: SunMoon },
] as const;

/**
 * next-themes cannot know the theme on the server, so `theme` is undefined
 * until the component has hydrated. Pressing an item before that would cause a
 * hydration mismatch, so the group renders with nothing pressed on the server
 * and lights up the active mode on the first client render.
 */
// Nothing to subscribe to: the value only differs between server and client.
const subscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/**
 * Color-scheme switcher: a segmented control with one item per mode.
 *
 * "Auto" follows the OS preference live (light by day, dark after sunset).
 * "Light" and "Dark" pin the scheme regardless of the OS. next-themes stores
 * the choice and applies it before first paint. Icons only; labels are for
 * assistive tech.
 */
export function SchemeToggle() {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();

  return (
    <ToggleGroup
      variant="outline"
      spacing={0}
      aria-label="Color scheme"
      value={hydrated && theme ? [theme] : []}
      onValueChange={([next]) => {
        // In single-select mode re-clicking the pressed item empties the
        // value; keep the current mode so one is always selected.
        if (next) setTheme(next);
      }}
    >
      {MODES.map(({ value, label, Icon }) => (
        <ToggleGroupItem key={value} value={value} aria-label={label}>
          <Icon aria-hidden="true" />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
