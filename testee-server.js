import { parse } from "https://deno.land/std@0.168.0/flags/mod.ts";

const { port } = parse(Deno.args, {
  number: ["port"],
  default: {
    port: 9001,
  },
});

const { serve } = Deno;
// A message-based WebSocket echo server.
serve((request) => {
  const { socket, response } = Deno.upgradeWebSocket(request);
  socket.onmessage = (event) => {
    socket.send(event.data);
  };
  return response;
}, { port });
