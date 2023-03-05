import { serve } from "inngest/next";
import { inngest } from "~/inngest/client";
import fn from "~/inngest/functions/test-cron";

export default serve(inngest, [fn]);
