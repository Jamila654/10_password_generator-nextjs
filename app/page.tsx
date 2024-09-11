"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

export default function Home() {
  const [passLength, setPassLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const handleGeneratePassword = () => {
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

    let characterPool = "";
    if (includeUppercase) characterPool += uppercaseLetters;
    if (includeLowercase) characterPool += lowercaseLetters;
    if (includeNumbers) characterPool += numbers;
    if (includeSymbols) characterPool += symbols;

    if (characterPool === "") {
      alert("Please select at least one option to generate a password.");
      return;
    }

    let password = "";
    for (let i = 0; i < passLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      password += characterPool[randomIndex];
    }

    setGeneratedPassword(password);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword).then(() => {
      alert("Password copied to clipboard!");
    });
  };

  const handleCheckedChange = (checked: CheckedState) => {
    return checked === true;
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Password Generator</CardTitle>
            <CardDescription>
              Create a secure password with just a few clicks.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-between gap-3">
            <div className="input sm:flex sm:text-nowrap sm:items-center sm:gap-2">
              <h1>Password Length</h1>
              <Input
                type="number"
                value={passLength}
                onChange={(e) => setPassLength(Number(e.target.value))}
              />
            </div>
            <div className="select flex flex-col justify-between gap-2">
              <h1>Include:</h1>
              <div className="checkbox flex flex-col">
                <div className="first">
                  <Checkbox
                    className="rounded-full"
                    checked={includeUppercase}
                    onCheckedChange={(checked) =>
                      setIncludeUppercase(handleCheckedChange(checked))
                    }
                  />{" "}
                  Uppercase Letters
                </div>
                <div className="first">
                  <Checkbox
                    className="rounded-full"
                    checked={includeLowercase}
                    onCheckedChange={(checked) =>
                      setIncludeLowercase(handleCheckedChange(checked))
                    }
                  />{" "}
                  Lowercase Letters
                </div>
                <div className="first">
                  <Checkbox
                    className="rounded-full"
                    checked={includeNumbers}
                    onCheckedChange={(checked) =>
                      setIncludeNumbers(handleCheckedChange(checked))
                    }
                  />{" "}
                  Numbers
                </div>
                <div className="first">
                  <Checkbox
                    className="rounded-full"
                    checked={includeSymbols}
                    onCheckedChange={(checked) =>
                      setIncludeSymbols(handleCheckedChange(checked))
                    }
                  />{" "}
                  Symbols
                </div>
              </div>
            </div>
            <div className="generate flex justify-center">
              <Button onClick={handleGeneratePassword}>Generate Password</Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="title w-full items-start">
              <p>Generated Password</p>
            </div>
            <div className="generated flex items-center justify-between gap-2 w-full">
              <div className="display border-2 rounded-md flex flex-grow h-10 p-2">
                {generatedPassword}
              </div>
              <Button onClick={handleCopyToClipboard}>Copy to Clipboard</Button>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}




