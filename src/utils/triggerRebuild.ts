import fetch from 'node-fetch';

export const triggerRebuild = async () => {
  const deployUrl = process.env.ASTRO_FRONTEND_BUILD_HOOK;

  if (!deployUrl) {
    console.warn('ASTRO_FRONTEND_BUILD_HOOK is not defined.');
    return;
  }

  try {
    const response = await fetch(deployUrl, { method: 'POST' });

    if (!response.ok) {
      console.error(`Failed to trigger rebuild: ${response.statusText}`);
    } else {
      console.log('✅ Triggered Astro rebuild');
    }
  } catch (error) {
    console.error('❌ Error triggering rebuild:', error);
  }
};