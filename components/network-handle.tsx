import { GitHubLogo, XLogo } from "@/components/network-icons";

type NetworkHandleProps =
  | { network: "x"; handle: string; personName: string }
  | { network: "github"; url: string; personName: string };

export function NetworkHandle(props: NetworkHandleProps) {
  if (props.network === "x") {
    return (
      <span className="inline-flex max-w-full min-w-0 items-center gap-2">
        <XLogo className="size-4 shrink-0" />
        <a
          href={`https://x.com/${props.handle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${props.personName} on X`}
          className="min-w-0 font-mono whitespace-nowrap rounded-sm outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          @{props.handle}
        </a>
      </span>
    );
  }

  return (
    <span className="inline-flex max-w-full min-w-0 items-center gap-2">
      <GitHubLogo className="size-4 shrink-0" />
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${props.personName} on GitHub`}
        className="font-mono break-all rounded-sm outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {props.url.replace("https://github.com/", "")}
      </a>
    </span>
  );
}
