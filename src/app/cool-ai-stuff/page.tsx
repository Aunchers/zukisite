"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Star,
  Users,
  Lock,
  Unlock,
  Github,
  AlertTriangle,
  Search,
  SortAsc,
  SortDesc,
  Info,
  Cpu,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function Component() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("users");
  const [sortOrder, setSortOrder] = useState("desc");

  const apiData = [
    {
      name: "ZukiJourney",
      users: 5265,
      nsfw: "Use /unfilter, not /v1",
      openSource: true,
      owner: "Our Team",
      tier: 1,
      notes:
        "Largest & Oldest GPT-4 API still continuously around. Offers other popular AI-related Bots too.",
      models: ["GPT-4", "GPT-3.5", "DALL-E 2", "Stable Diffusion"],
    },
    {
      name: "NagaAI",
      users: 3143,
      nsfw: "Forbidden",
      openSource: false,
      owner: "ZentixUA",
      tier: 1,
      notes:
        "Honorary successor to ChimeraGPT, the largest API in history (15k users).",
      models: ["GPT-4", "LLaMA 2", "Claude 2"],
    },
    {
      name: "KrakenAI",
      users: 632,
      nsfw: "Allowed",
      openSource: false,
      owner: "PaniniCo",
      tier: 1,
      notes: "Small, long-term stable API. Runs on https://poe.com",
      models: ["GPT-3.5", "BERT", "T5"],
    },
    {
      name: "FreeGPT",
      users: 475,
      nsfw: "Forbidden",
      openSource: false,
      owner: "Fresed",
      tier: 1,
      notes:
        "Small API maintained by a surprisingly committed dev. Good quality.",
      models: ["GPT-3.5", "GPT-J", "BLOOM"],
    },
    {
      name: "Shard",
      users: 735,
      nsfw: "Only OSS-Models",
      openSource: false,
      owner: "Puzzy",
      tier: 2,
      notes:
        "Edgiest API with a controversial/questionable environment. Good service otherwise.",
      models: ["LLaMA", "GPT-Neo", "EleutherAI"],
    },
  ];

  const filteredAndSortedData = apiData
    .filter(
      (api) =>
        api.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        api.owner.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (sortBy === "users") {
        return sortOrder === "asc" ? a.users - b.users : b.users - a.users;
      } else {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
    });

  const EndpointsTable = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
        <div className="relative w-full md:w-64">
          <Input
            type="text"
            placeholder="Search APIs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
        </div>
        <div className="flex items-center space-x-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="users">Users</SelectItem>
              <SelectItem value="name">Name</SelectItem>
            </SelectContent>
          </Select>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="p-2 hover:bg-muted rounded-full"
          >
            {sortOrder === "asc" ? (
              <SortAsc className="h-5 w-5" />
            ) : (
              <SortDesc className="h-5 w-5" />
            )}
          </motion.button>
        </div>
      </div>
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Service</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>NSFW/RP</TableHead>
              <TableHead>Open Source</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>AI Models</TableHead>
              <TableHead className="w-[300px]">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <AnimatePresence>
              {filteredAndSortedData.map((api) => (
                <motion.tr
                  key={api.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TableCell className="font-medium">{api.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      {api.users.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    {api.nsfw === "Forbidden" ? (
                      <Badge
                        variant="destructive"
                        className="flex items-center"
                      >
                        <Lock className="mr-1 h-3 w-3" />
                        Forbidden
                      </Badge>
                    ) : api.nsfw === "Allowed" ? (
                      <Badge variant="default" className="flex items-center">
                        <Unlock className="mr-1 h-3 w-3" />
                        Allowed
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="flex items-center">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        {api.nsfw}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {api.openSource ? (
                      <Badge variant="outline" className="flex items-center">
                        <Github className="mr-1 h-3 w-3" />
                        Open
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="flex items-center">
                        <Lock className="mr-1 h-3 w-3" />
                        Closed
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{api.owner}</TableCell>
                  <TableCell>
                    <div className="flex">
                      {[...Array(api.tier)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400" />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <motion.button
                          className="flex items-center space-x-1 text-sm font-medium text-blue-600 hover:text-blue-800"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Cpu className="h-4 w-4" />
                          <span>{api.models.length} Models</span>
                        </motion.button>
                      </PopoverTrigger>
                      <PopoverContent className="w-64">
                        <h4 className="font-semibold mb-2">
                          Available Models:
                        </h4>
                        <ul className="list-disc pl-4">
                          {api.models.map((model, index) => (
                            <li key={index}>{model}</li>
                          ))}
                        </ul>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell className="text-sm">{api.notes}</TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          </TableBody>
        </Table>
      </div>
    </motion.div>
  );

  const OverviewTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent className="p-6 space-y-4">
          <h3 className="text-2xl font-semibold mb-4">
            Welcome to the AI API Showcase
          </h3>
          <p className="text-muted-foreground">
            This showcase presents a curated collection of AI APIs and Websites
            offering free usage of various AI models. Before exploring, please
            note:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>We do not endorse any of the listed services.</li>
            <li>Some services may be considered controversial.</li>
            <li>
              We are not responsible for any legal, technical, or other damages
              caused by using these services.
            </li>
            <li>
              Data is provided without warranty of any kind. Use these at your
              own risk.
            </li>
          </ul>
          <p className="text-muted-foreground">
            Explore the Endpoints tab for detailed information on each API, or
            visit the Tiers tab to understand our ranking system and
            categorization of services.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );

  const TiersTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle>Understanding Our Tiering System</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Our tiering system is designed to categorize AI APIs based on their
            features, stability, and user base. Here's how we rank the services:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Number of Users:</strong> A higher user count often
              indicates a more established and reliable service.
            </li>
            <li>
              <strong>NSFW/RP Policy:</strong> We consider the service's policy
              on Not Safe For Work (NSFW) or Role-Playing (RP) content.
            </li>
            <li>
              <strong>Open Source Status:</strong> Whether the API is open
              source can affect its ranking.
            </li>
            <li>
              <strong>Stability and Longevity:</strong> APIs that have been
              around longer and demonstrate stability are ranked higher.
            </li>
            <li>
              <strong>Features and Capabilities:</strong> The range and quality
              of AI models and features offered by the API.
            </li>
          </ul>
        </CardContent>
      </Card>
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 to-amber-600 p-1">
          <CardContent className="bg-card p-6 rounded-sm">
            <h3 className="text-2xl font-bold mb-4">
              Tier 1: Established, Premium-Service AI API Leaders
            </h3>
            <p className="mb-4">These APIs are characterized by:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Large user base (typically over 1000 users)</li>
              <li>Stable and long-standing presence in the market</li>
              <li>Comprehensive feature set and high-quality AI models</li>
              <li>Often offer GPT-4 or other advanced AI capabilities</li>
            </ul>
            <div className="space-y-2">
              {apiData
                .filter((api) => api.tier === 1)
                .map((api) => (
                  <motion.div
                    key={api.name}
                    className="bg-muted p-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="font-semibold">{api.name}</span> -{" "}
                    {api.notes}
                  </motion.div>
                ))}
            </div>
          </CardContent>
        </div>
      </Card>
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-400 to-cyan-600 p-1">
          <CardContent className="bg-card p-6 rounded-sm">
            <h3 className="text-2xl font-bold mb-4">
              Tier 2: Standard, Basic AI API Services
            </h3>
            <p className="mb-4">These APIs are characterized by:</p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Smaller user base (typically under 1000 users)</li>
              <li>
                May be newer to the market or offer more specialized services
              </li>
              <li>Basic feature set, often focusing on specific AI tasks</li>
              <li>
                May have limitations in terms of model capabilities or usage
              </li>
            </ul>
            <div className="space-y-2">
              {apiData
                .filter((api) => api.tier === 2)
                .map((api) => (
                  <motion.div
                    key={api.name}
                    className="bg-muted p-4 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="font-semibold">{api.name}</span> -{" "}
                    {api.notes}
                  </motion.div>
                ))}
            </div>
          </CardContent>
        </div>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Additional Notes on Ranking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Our ranking system is dynamic and subject to change based on the
            evolving AI landscape. We consider factors such as:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>User feedback and community reputation</li>
            <li>Recent updates and improvements to the API</li>
            <li>Compliance with ethical AI practices</li>
            <li>Transparency in operations and data usage</li>
          </ul>
          <p>
            Remember that while these rankings provide a general guide, the best
            API for your needs may depend on your specific requirements and use
            case.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <motion.h2
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        AI API Showcase
      </motion.h2>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="tiers">Tiers</TabsTrigger>
        </TabsList>
        <AnimatePresence mode="wait">
          <TabsContent value="overview" key="overview">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="endpoints" key="endpoints">
            <EndpointsTable />
          </TabsContent>
          <TabsContent value="tiers" key="tiers">
            <TiersTab />
          </TabsContent>
        </AnimatePresence>
      </Tabs>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              className="fixed bottom-4 right-4 p-2 bg-primary text-primary-foreground rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Info className="h-6 w-6" />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Need help? Click for more information</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
