import { GitHubLogo, XLogo } from "@/components/network-icons";

type NetworkHandleProps =
  | { network: "x"; handle: string; personName: string }
  | { network: "github"; url: string; personName: string };

export function NetworkHandle(props: NetworkHandleProps) {
  if (props.network === "x") {
    return (
      <span className="inline-flex items-center gap-2">
        <XLogo className="size-4" />
        <a
          href={`https://x.com/${props.handle}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${props.personName} on X`}
          className="font-mono hover:underline"
        >
          @{props.handle}
        </a>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-2">
      <GitHubLogo className="size-4" />
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${props.personName} on GitHub`}
        className="font-mono break-all hover:underline"
      >
        {props.url.replace("https://github.com/", "")}
      </a>
    </span>
  );
}
