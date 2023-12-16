// BatteryStatusModule.mm

#import "BatteryStatusModule.h"
#import <React/RCTLog.h>

@implementation BatteryStatusModule

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(isBatterySaverModeEnabled:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    if ([[NSProcessInfo processInfo] isLowPowerModeEnabled]) {
        resolve(@YES);
    } else {
        resolve(@NO);
    }
}

@end
