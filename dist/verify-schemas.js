"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("./models/User"));
const Event_1 = __importDefault(require("./models/Event"));
const Guest_1 = __importDefault(require("./models/Guest"));
const CheckinLog_1 = __importDefault(require("./models/CheckinLog"));
function verify() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Verifying schemas...');
            // Just instantiate to check for runtime errors in definition
            new User_1.default({ name: 'Test', email: 'test@test.com' });
            new Event_1.default({ name: 'Test Event', time: new Date(), location: 'Test Loc' });
            new Guest_1.default({ name: 'Guest', event_id: new mongoose_1.default.Types.ObjectId(), ticket_code: '123' });
            new CheckinLog_1.default({ guest_id: new mongoose_1.default.Types.ObjectId(), event_id: new mongoose_1.default.Types.ObjectId() });
            console.log('Schemas verified successfully!');
        }
        catch (error) {
            console.error('Schema verification failed:', error);
            process.exit(1);
        }
    });
}
verify();
