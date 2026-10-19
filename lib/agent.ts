import {
  ToolLoopAgent,
  type InferAgentUIMessage,
  type UIToolInvocation,
} from "ai";
import { searchProducts, getAllCategories, returnOrder, getProductDetails } from "@/lib/tools";

export const shoppingAgent = new ToolLoopAgent({ 
    model: "anthropic/claude-sonnet-5", 
    instructions: `You are a friendly shopping assistant for Ship It Shop.
    Determine if user is asking for general product information, a specific product, or wants to return an order.
    
    For general products, use the searchProducts tool to find products in the store based on the customer's request before answering.
    Suggest products that are already on the shopping page based on the customer's ask.
    Don't assume and make up products to be presented.
    Keep it concise and helpful.
    When asked about a type or category of product use the getAllCategories tool for getting valid categories before using searchProducts.
    When the user wants to return an order, use the returnOrder tool. Ask for the order ID and reason if they haven't provided them. Example order IDs are 11111, 22222, and 33333.
    For querying a specific product, use the getProductDetails tool.
    `, 
    tools: { searchProducts, getAllCategories, returnOrder, getProductDetails },
});

export type ShoppingAgentUIMessage = InferAgentUIMessage<typeof shoppingAgent>;
export type SearchProductsToolInvocation = UIToolInvocation<typeof searchProducts>;
export type ProductDetailsToolInvocation = UIToolInvocation<typeof getProductDetails>;