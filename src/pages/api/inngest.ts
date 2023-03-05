import { Inngest } from "inngest";
import { serve } from "inngest/next";
import fn from "./inngest/test-update"; // Your own function
const inngest = new Inngest({ name: "typle" });
export default serve(
  inngest,
  [fn] // A list of functions to expose.  This can be empty to start.
);
