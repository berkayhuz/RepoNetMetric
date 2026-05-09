"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "../../lib/utils";

type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
    color?: string;
  };
};

type ChartPayloadItem = {
  name?: string | number;
  dataKey?: string | number;
  value?: string | number | Array<string | number>;
  color?: string;
  fill?: string;
  payload?: Record<string, unknown>;
};

type ChartLegendPayloadItem = {
  value?: React.ReactNode;
  color?: string;
  dataKey?: string | number;
};

type ChartTooltipFormatter = (
  value: ChartPayloadItem["value"],
  name: ChartPayloadItem["name"],
  item: ChartPayloadItem,
  index: number,
  payload: ChartPayloadItem[],
) => React.ReactNode;

type ChartLabelFormatter = (label: React.ReactNode, payload: ChartPayloadItem[]) => React.ReactNode;

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = React.createContext<ChartContextProps | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

type ChartContainerProps = React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ReactElement;
};

function ChartContainer({ id, className, children, config, ...props }: ChartContainerProps) {
  const uniqueId = React.useId();
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground",
          "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-border",
          "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-layer]:outline-none",
          "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border",
          "[&_.recharts-radial-bar-background-sector]:fill-muted",
          "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted",
          "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-border",
          "[&_.recharts-sector[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-sector]:outline-none",
          "[&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />

        <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(([, itemConfig]) => itemConfig.color);

  if (!colorConfig.length) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => `  --color-${key}: ${itemConfig.color};`).join("\n")}
}
`,
      }}
    />
  );
}

const ChartTooltip = RechartsPrimitive.Tooltip;

type ChartTooltipContentProps = {
  active?: boolean;
  payload?: ChartPayloadItem[];
  label?: React.ReactNode;
  className?: string;
  labelClassName?: string;
  formatter?: ChartTooltipFormatter;
  labelFormatter?: ChartLabelFormatter;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: "line" | "dot";
  nameKey?: string;
  labelKey?: string;
};

function getPayloadConfigFromPayload(config: ChartConfig, payload: ChartPayloadItem, key: string) {
  const payloadPayload = payload.payload;

  let configLabelKey = key;

  if (
    payloadPayload &&
    typeof payloadPayload === "object" &&
    key in payloadPayload &&
    typeof payloadPayload[key] === "string"
  ) {
    configLabelKey = payloadPayload[key];
  }

  return config[configLabelKey] ?? config[key];
}

function formatTooltipValue(value: ChartPayloadItem["value"]) {
  if (typeof value === "number") {
    return value.toLocaleString();
  }

  if (Array.isArray(value)) {
    return value.join(" - ");
  }

  return value;
}

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  nameKey,
  labelKey,
}: ChartTooltipContentProps) {
  const { config } = useChart();

  const tooltipLabel = React.useMemo(() => {
    if (!active || !payload?.length) {
      return null;
    }

    if (hideLabel) {
      return null;
    }

    const item = payload[0];

    const key = `${labelKey ?? item?.dataKey ?? item?.name ?? "value"}`;
    const itemConfig = item ? getPayloadConfigFromPayload(config, item, key) : undefined;

    const value =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : (itemConfig?.label ?? label);

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>{labelFormatter(value, payload)}</div>
      );
    }

    if (!value) {
      return null;
    }

    return <div className={cn("font-medium", labelClassName)}>{value}</div>;
  }, [active, config, hideLabel, label, labelClassName, labelFormatter, labelKey, payload]);

  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border bg-background px-3 py-2 text-xs shadow-xl",
        className,
      )}
    >
      {tooltipLabel}

      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey ?? item.name ?? item.dataKey ?? `value-${index}`}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          const indicatorColor = item.color ?? item.fill ?? "currentColor";

          return (
            <div key={`${key}-${index}`} className="flex w-full items-center gap-2">
              {!hideIndicator && (
                <div
                  className={cn(
                    "shrink-0 rounded-[2px]",
                    indicator === "dot" ? "size-2" : "h-2 w-4",
                  )}
                  style={{
                    backgroundColor: indicatorColor,
                  }}
                />
              )}

              <div className="flex flex-1 items-center justify-between gap-2">
                <span className="text-muted-foreground">{itemConfig?.label ?? item.name}</span>

                <span className="font-mono font-medium tabular-nums text-foreground">
                  {formatter
                    ? formatter(item.value, item.name, item, index, payload)
                    : formatTooltipValue(item.value)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ChartLegend = RechartsPrimitive.Legend;

type ChartLegendContentProps = React.ComponentProps<"div"> & {
  payload?: ChartLegendPayloadItem[];
  hideIcon?: boolean;
  nameKey?: string;
  verticalAlign?: "top" | "middle" | "bottom";
};

function ChartLegendContent({
  className,
  payload,
  hideIcon = false,
  nameKey,
}: ChartLegendContentProps) {
  const { config } = useChart();

  if (!payload?.length) {
    return null;
  }

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      {payload.map((item, index) => {
        const key = `${nameKey ?? item.dataKey ?? item.value ?? `item-${index}`}`;
        const itemConfig = config[key];

        return (
          <div key={`${key}-${index}`} className="flex items-center gap-1.5">
            {!hideIcon && (
              <div
                className="size-2 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}

            <span className="text-muted-foreground">{itemConfig?.label ?? item.value}</span>
          </div>
        );
      })}
    </div>
  );
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  type ChartConfig,
};
