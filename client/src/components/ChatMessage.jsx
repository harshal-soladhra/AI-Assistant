import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const ChatMessage = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <div
      className={cn(
        "flex gap-4 p-4 rounded-lg",
        isUser ? "bg-muted" : "bg-card border border-border"
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-primary-foreground" : "bg-tutor text-tutor-foreground"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden">
        <p className="text-sm font-medium">
          {isUser ? "You" : "AI Tutor"}
        </p>
        <div className="prose prose-sm dark:prose-invert max-w-none break-words">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
              li: ({ children }) => <li className="mb-1">{children}</li>,
              code: ({ node, inline, className, children, ...props }) => {
                return (
                  <code
                    className={cn(
                      "bg-muted px-1 py-0.5 rounded text-xs font-mono",
                      !inline && "block p-4 overflow-x-auto my-2",
                      className
                    )}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
