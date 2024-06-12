import { Component, computed, input } from "@angular/core";
import { cva } from "class-variance-authority";
import { cn } from "./utils";
import { NgTemplateOutlet } from "@angular/common";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-blue-700 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-6 w-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

@Component({
  selector: "app-button",
  standalone: true,
  imports: [NgTemplateOutlet],
  template: `
    <ng-template #content>
      <ng-content />
    </ng-template>
    @if (type() === "button") {
      <button [class]="mergedClass()" [attr.data-cy]="dataCy()">
        <ng-container *ngTemplateOutlet="content" />
      </button>
    } @else if (type() === "external_link") {
      <a [class]="mergedClass()" [href]="href()" target="_blank" [attr.data-cy]="dataCy()">
        <ng-container *ngTemplateOutlet="content" />
      </a>
    }
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class Button {
  readonly type = input<"button" | "external_link">("button");
  readonly variant = input<NonNullable<Parameters<typeof buttonVariants>[0]>["variant"]>();
  readonly size = input<NonNullable<Parameters<typeof buttonVariants>[0]>["size"]>();
  readonly class = input("");
  readonly href = input<string>();
  readonly dataCy = input<string>();

  readonly mergedClass = computed(() => cn(buttonVariants({ variant: this.variant(), size: this.size() }), this.class));
}
