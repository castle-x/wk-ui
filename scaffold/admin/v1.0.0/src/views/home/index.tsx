import { HomeIcon, SendIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import app from "../../../app.json";
import { HelloServiceClient } from "@/api/__PROJECT_NAME__/hello/v1/client";

const helloClient = new HelloServiceClient("/api/hello");

export function HomePage() {
  const { t } = useTranslation("dashboard");
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSayHello = async () => {
    const input = name.trim() || "World";
    setLoading(true);
    setResponse("");
    try {
      const resp = await helloClient.SayHello({ name: input });
      setResponse(resp.message);
    } catch (err) {
      setResponse(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <HomeIcon className="size-6 text-muted-foreground" />
            <h2 className="text-xl font-semibold">{t("nav.home")}</h2>
          </div>
          <p className="mt-4 text-muted-foreground">
            {t("pages.home.description", { name: app.displayName })}
          </p>

          {/* Say Hello API demo */}
          <div className="mt-8 rounded-lg border p-6 max-w-md">
            <h3 className="text-lg font-medium mb-4">
              {t("pages.home.api_demo", { defaultValue: "API Demo" })}
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSayHello()}
                placeholder={t("pages.home.name_placeholder", { defaultValue: "Enter your name..." })}
                className="flex-1 rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="button"
                onClick={handleSayHello}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                <SendIcon className="size-4" />
                {t("pages.home.say_hello", { defaultValue: "Say Hello" })}
              </button>
            </div>
            {response && (
              <div className="mt-4 rounded-md bg-muted p-3 text-sm">
                {response}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
